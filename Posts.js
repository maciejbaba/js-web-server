const Post = require("./Post");
const postsData = require("./db.js");

const Posts = postsData.map((post) => {
  return new Post(post.id, post.content, post.title, post.author);
});

module.exports = Posts;