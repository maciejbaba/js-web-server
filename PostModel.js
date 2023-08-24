const Post = require("./Post");
const getPosts = require("./Posts");
fs = require("fs");
const name = "postsData.json";

class PostModel extends Post {
  constructor(post) {
    super(post.content, post.title, post.author);
  }

  getData() {
    return {
      id: this.id,
      content: this.content,
      title: this.title,
      author: this.author,
    };
  }
  static getById(id) {
    const posts = getPosts();
    const post = posts.find((p) => p.id === id);
    if (post) {
      return post;
    }
    return "Post not found";
  }
  static update(post) {
    const posts = getPosts();
    const postToUpdate = posts.find((p) => p.id === post.id);
    if (!postToUpdate) {
      return "Post not found";
    }
    const newPosts = posts.map((p) => {
      if (p.id === post.id) {
        return post;
      }
      return p;
    });
    fs.writeFileSync(name, JSON.stringify(newPosts));
  }

  static add(post) {
    if (!(post instanceof Post) || !(post instanceof PostModel)) { // has to be in parentheses because ! has higher precedence than instanceof and condition evaluates incorrectly
      console.log("Not a post");
      return "Not a post";
    }
    if (!post.getTitle()) {
      return "Missing title";
    }
    if (!post.getContent()) {
      return "Missing content";
    }
    if (!post.getAuthor()) {
      return "Missing author";
    }

    const posts = getPosts();
    const newPosts = [...posts, post];
    fs.writeFileSync(name, JSON.stringify(newPosts));
  }

  static delete(id) {
    const newPosts = getPosts().filter((post) => post.id !== id);
    fs.writeFileSync(name, JSON.stringify(newPosts));
  }
}

module.exports = PostModel;
