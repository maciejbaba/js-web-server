const { server, PORT, NODE_ENV } = require("./server");

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode`);
});
