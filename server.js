import http from "node:http";
import { ApiClient } from "./modules/ApiClient.js";
import { CollectionManager } from "./modules/CollectionManager.js";
import { apiConfig, savedItemsFilePath } from "./modules/config.js";
import { getOrCreateVisitorId } from "./modules/cookieUtils.js";
import { createFileStorage } from "./modules/fileStorage.js";
import { createIdGenerator, getHighestIdNumber } from "./modules/idGenerator.js";
import { getPathAndQuery, parseJsonBody } from "./modules/requestUtils.js";
import { sendError, sendJson } from "./modules/responseUtils.js";
import {
  printError,
  printExternalApiSearch,
  printRequestLog,
  printServerStarted,
} from "./modules/printUtils.js";

function getItemIdFromPath(pathname) {
  const match = pathname.match(/^\/items\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getFilters(query) {
  return {
    status: query.get("status") ?? "",
    tag: query.get("tag") ?? "",
    priority: query.get("priority") ?? "",
    search: query.get("search") ?? "",
  };
}

const availableRoutes = [
  "GET /",
  "GET /health",
  "GET /api-info",
  "GET /external/search?query=...",
  "POST /items",
  "POST /items/import",
  "GET /items",
  "GET /items/:id",
  "PATCH /items/:id",
  "DELETE /items/:id",
  "GET /stats",
];

function sendLoggedJson(req, res, statusCode, data) {
  printRequestLog(req, statusCode);
  sendJson(res, statusCode, data);
}

function sendLoggedError(req, res, statusCode, message) {
  printRequestLog(req, statusCode);
  sendError(res, statusCode, message);
}

export async function startServer(port = 3000) {
  const storage = createFileStorage(savedItemsFilePath, []);
  const existingItems = await storage.read();
  const generateItemId = createIdGenerator(
    "ITEM",
    getHighestIdNumber(existingItems, "id", "ITEM"),
  );
  const generateVisitorId = createIdGenerator(
    "VIS",
    getHighestIdNumber(existingItems, "userId", "VIS"),
  );

  const apiClient = new ApiClient(apiConfig);
  const collectionManager = new CollectionManager({
    apiClient,
    apiConfig,
    generateItemId,
    storage,
  });

  await collectionManager.load();

  const server = http.createServer(async (req, res) => {
    const { pathname, query } = getPathAndQuery(req);

    try {
      if (req.method === "GET" && pathname === "/favicon.ico") {
        printRequestLog(req, 204);
        res.statusCode = 204;
        res.end();
        return;
      }

      const visitorId = getOrCreateVisitorId(req, res, generateVisitorId);

      if (req.method === "GET" && pathname === "/") {
        sendLoggedJson(req, res, 200, {
          success: true,
          message: "Public API CRUD Hub is running",
          data: {
            apiName: apiConfig.apiName,
            routes: availableRoutes,
          },
        });
        return;
      }

      if (req.method === "GET" && pathname === "/health") {
        sendLoggedJson(req, res, 200, {
          success: true,
          message: "Server is active",
          visitorId,
        });
        return;
      }

      if (req.method === "GET" && pathname === "/api-info") {
        sendLoggedJson(req, res, 200, {
          success: true,
          data: {
            apiName: apiConfig.apiName,
            documentationUrl: apiConfig.documentationUrl,
            itemType: apiConfig.itemType,
            baseUrl: apiConfig.baseUrl,
            searchEndpoint: `${apiConfig.baseUrl}${apiConfig.searchPath}`,
            itemEndpoint: `${apiConfig.baseUrl}${apiConfig.itemPath}/:id`,
          },
        });
        return;
      }

      if (req.method === "GET" && pathname === "/external/search") {
        const searchQuery = query.get("query")?.trim() ?? "";

        if (!searchQuery) {
          sendLoggedError(req, res, 400, "query param is required");
          return;
        }

        const results = await apiClient.searchExternalItems(searchQuery);
        printExternalApiSearch(apiConfig.apiName, searchQuery, results.length);

        sendLoggedJson(req, res, 200, {
          success: true,
          data: results,
        });
        return;
      }

      if (req.method === "POST" && pathname === "/items") {
        const body = await parseJsonBody(req);
        const item = await collectionManager.createItem({
          ...body,
          userId: visitorId,
        });

        sendLoggedJson(req, res, 201, {
          success: true,
          message: "Item created successfully",
          data: item,
        });
        return;
      }

      if (req.method === "POST" && pathname === "/items/import") {
        const body = await parseJsonBody(req);
        const item = await collectionManager.importItemFromExternalApi({
          ...body,
          userId: visitorId,
        });

        sendLoggedJson(req, res, 201, {
          success: true,
          message: "Item imported successfully",
          data: item,
        });
        return;
      }

      if (req.method === "GET" && pathname === "/items") {
        const items = collectionManager.getAllItems({
          ...getFilters(query),
          userId: visitorId,
        });

        sendLoggedJson(req, res, 200, {
          success: true,
          data: items,
        });
        return;
      }

      const itemId = getItemIdFromPath(pathname);

      if (req.method === "GET" && itemId) {
        const item = collectionManager.getItemById(itemId, visitorId);

        sendLoggedJson(req, res, 200, {
          success: true,
          data: item,
        });
        return;
      }

      if (req.method === "PATCH" && itemId) {
        const body = await parseJsonBody(req);
        const item = await collectionManager.updateItem(itemId, body, visitorId);

        sendLoggedJson(req, res, 200, {
          success: true,
          message: "Item updated successfully",
          data: item,
        });
        return;
      }

      if (req.method === "DELETE" && itemId) {
        const deletedItem = await collectionManager.deleteItem(itemId, visitorId);

        sendLoggedJson(req, res, 200, {
          success: true,
          message: "Item deleted successfully",
          data: deletedItem,
        });
        return;
      }

      if (req.method === "GET" && pathname === "/stats") {
        const stats = collectionManager.getStats(visitorId);

        sendLoggedJson(req, res, 200, {
          success: true,
          data: stats,
        });
        return;
      }

      sendLoggedError(req, res, 404, "Route not found");
    } catch (error) {
      const statusCode = error.statusCode ?? 500;
      const message = statusCode === 500 ? "Internal server error" : error.message;

      printError(error);
      sendLoggedError(req, res, statusCode, message);
    }
  });

  server.listen(port, () => {
    printServerStarted(port);
  });

  return server;
}
