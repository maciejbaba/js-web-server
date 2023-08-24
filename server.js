const http = require("http");
const matchRoute = require("./matchRoute");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev"; // test is default

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
    return;
  }
  const matchedRoute = matchRoute(method, url);
  if (matchedRoute) {
    const { handler, params } = matchedRoute;
    req.params = params;
    handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

module.exports = {
  PORT,
  server,
  NODE_ENV,
};
