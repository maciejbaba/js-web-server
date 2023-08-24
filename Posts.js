const Post = require("./Post");
const postsData = require("./postsData.json");

const Posts = postsData.map((post) => {
  return new Post(post.content, post.title, post.author);
});

module.exports = Posts;