const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("./controllers");

const routes = {
  "GET/posts": getPosts,
  "GET/posts/:id": getPostById,
  "POST/posts": createPost,
  "PUT/posts/:id": updatePost,
  "DELETE/posts/:id": deletePost,
};

module.exports = routes;
