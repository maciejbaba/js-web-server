const { v4: uuidv4 } = require("uuid");

class Post {
  constructor(content, title, author) {
    this.id = uuidv4();
    this.content = content;
    this.title = title;
    this.author = author;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(author) {
    this.author = author;
  }
}

module.exports = Post;
