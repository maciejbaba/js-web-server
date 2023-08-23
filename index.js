const { server, PORT } = require("./server");

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode`);
});
