const Post = require("./Post");
const name = "db/postsData.json";
const fs = require("fs");

const getPosts = () => {
  const posts = JSON.parse(fs.readFileSync(name, "utf8"));
  const newPosts = posts.map((post) => {
    const newPost = new Post(post.content, post.title, post.author);
    newPost.setId(post.id); // newPost by default will have auto generated id, but we want to use the id from the json file
    return newPost;
  });
  return newPosts;
};

module.exports = getPosts;
