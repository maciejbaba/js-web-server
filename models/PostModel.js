const Post = require("./Post");
const getPosts = require("./Posts");
fs = require("fs");
const name = "db/postsData.json";

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
    return null;
  }
  static update(post) {
    const posts = getPosts();
    const postToUpdate = posts.find((p) => p.id === post.id);
    if (!postToUpdate) {
      return null;
    }
    const newPosts = posts.map((p) => {
      if (p.id === post.id) {
        return post;
      }
      return p;
    });
    fs.writeFileSync(name, JSON.stringify(newPosts));
    return post;
  }

  static add(post) {
    if (!(post instanceof Post) || !(post instanceof PostModel)) {
      // has to be in parentheses because ! has higher precedence than instanceof and condition evaluates incorrectly
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
    return post;
  }

  static delete(id) {
    const postToDelete = PostModel.getById(id);
    if (!postToDelete) {
      return null;
    }
    const newPosts = getPosts().filter((post) => post.id !== id);
    fs.writeFileSync(name, JSON.stringify(newPosts));
    return postToDelete;
  }
}

module.exports = PostModel;
