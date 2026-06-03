export function printTitle(title) {
  console.log("");
  console.log("========================================");
  console.log(title);
  console.log("========================================");
}

export function printRequestLog(req, statusCode) {
  console.log(`[${req.method}] ${req.url} -> ${statusCode}`);
}

export function printServerStarted(port) {
  console.log(`Server started on http://localhost:${port}`);
}

export function printExternalApiSearch(apiName, query, count) {
  console.log(`[external] ${apiName} search "${query}" returned ${count} result(s)`);
}

export function printError(error) {
  console.error(`[error] ${error.message}`);
}
