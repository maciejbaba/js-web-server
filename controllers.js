const getPosts = require("./Posts");
const PostModel = require("./PostModel");

function getAllPosts(req, res) {
  const posts = getPosts();
  if (!posts) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return "No posts found"
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(posts));
}

function getPostById(req, res) {
  const { id } = req.params;
  if (!id) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 No ID provided");
    return;
  }
  const post = PostModel.getPostById(id);
  if (!post) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(post));
}

function createPost(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const post = JSON.parse(body);
    const newPost = PostModel.add(post);
    if (!newPost) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Post not created");
      return;
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newPost));
  });
}

function updatePost(req, res) {
  const { id } = req.params;
  if (!id) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 No ID provided");
    return;
  }
  const post = PostModel.getById(id);
  if (!post) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Post with that ID not found");
    return;
  }
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const post = JSON.parse(body);
    const updatedPost = PostModel.update(post);
    if (!updatedPost) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Post not updated");
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedPost));
  });
}

function deletePost(req, res) {
  const { id } = req.params;
  if (!id) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 No ID provided");
    return;
  }
  const post = PostModel.getById(id);
  if (!post) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Post with that ID not found");
    return;
  }
  const deletedPost = PostModel.delete(id);
  if (!deletedPost) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 Post not deleted");
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(deletedPost));
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
