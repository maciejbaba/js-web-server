const http = require("http");
const Posts = require("./Posts");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev"; // test is default

const server = http.createServer((req, res) => {
  res.end(JSON.stringify(Posts));
});

module.exports = {
  PORT,
  server,
  NODE_ENV,
};
