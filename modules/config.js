import { fileURLToPath } from "node:url";

export const apiConfig = {
  apiName: "JSONPlaceholder",
  documentationUrl: "https://jsonplaceholder.typicode.com/",
  baseUrl: "https://jsonplaceholder.typicode.com",
  searchPath: "/posts",
  itemPath: "/posts",
  itemType: "post",
  maxSearchResults: 10,
  allowedStatuses: ["saved", "in_progress", "done", "archived"],
  defaultStatus: "saved",
  defaultPriority: 3,
  port: Number(process.env.PORT) || 3000,
};

export const savedItemsFilePath = fileURLToPath(
  new URL("../data/savedItems.json", import.meta.url),
);
