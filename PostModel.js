const Post = require("./Post");
const Posts = require("./Posts");

class PostModel extends Post {
  constructor(post) {
    super(post.content, post.title, post.author);
  }

  get getAll() {
    return Posts;
  }

  static getPostById(id) {
    return Posts[id];
  }

  static addPost(post) {
    Posts.push(post);
  }

  static deletePost(id) {
    Posts.splice(id, 1);
  }
}