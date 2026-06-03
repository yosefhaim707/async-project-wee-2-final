export function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(`${JSON.stringify(data, null, 2)}\n`);
}

export function sendError(res, statusCode, message) {
  sendJson(res, statusCode, {
    success: false,
    message,
  });
}
