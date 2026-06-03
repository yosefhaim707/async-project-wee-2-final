export function parseCookies(req) {
  const cookieHeader = req.headers.cookie ?? "";

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const [rawName, ...rawValue] = cookie.split("=");
      const name = decodeURIComponent(rawName);
      const value = decodeURIComponent(rawValue.join("="));

      return {
        ...cookies,
        [name]: value,
      };
    }, {});
}

export function getOrCreateVisitorId(req, res, generateVisitorId) {
  const cookies = parseCookies(req);

  if (cookies.visitorId) {
    return cookies.visitorId;
  }

  const visitorId = generateVisitorId();
  res.setHeader(
    "Set-Cookie",
    `visitorId=${encodeURIComponent(visitorId)}; Path=/; HttpOnly; SameSite=Lax`,
  );

  return visitorId;
}
