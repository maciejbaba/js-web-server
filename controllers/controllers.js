const getPosts = require("../models/Posts");
const PostModel = require("../models/PostModel");

const uuidRegex =
  /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/;

function getAllPosts(req, res) {
  const posts = getPosts();
  if (!posts) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return "No posts found";
  }
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
  const post = PostModel.getById(id);
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
    const { title, content, author } = post;
    if (!title) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing title");
      return;
    }
    if (!content) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing content");
      return;
    }
    if (!author) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing author");
      return;
    }
    const newPost = new PostModel(post);
    const addedPost = PostModel.add(newPost);
    if (!addedPost) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Post not created");
      return;
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(addedPost));
  });
}

function updatePost(req, res) {
  const { id } = req.params;
  if (!id) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 No ID provided");
    return;
  }
  if (!uuidRegex.test(id)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 Invalid ID");
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
    const { title, content, author } = post;
    if (!title) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing title");
      return;
    }
    if (!content) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing content");
      return;
    }
    if (!author) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("400 Missing author");
      return;
    }
    post.id = id;
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
  if (!uuidRegex.test(id)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("400 Invalid ID");
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
