export function getPathAndQuery(req) {
  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  return {
    pathname: url.pathname,
    query: url.searchParams,
  };
}

export function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        const error = new Error("JSON body is too large");
        error.statusCode = 413;
        reject(error);
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        if (!body.trim()) {
          resolve({});
          return;
        }

        resolve(JSON.parse(body));
      } catch {
        const error = new Error("Invalid JSON body");
        error.statusCode = 400;
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}
