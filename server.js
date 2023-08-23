const http = require("http");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev"; // test is default

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

module.exports = {
  PORT,
  server,
  NODE_ENV,
};
