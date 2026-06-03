import { startServer } from "./server.js";
import { apiConfig } from "./modules/config.js";
import { printTitle } from "./modules/printUtils.js";

printTitle("Public API CRUD Hub");

try {
  await startServer(apiConfig.port);
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
}
