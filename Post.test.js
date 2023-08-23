const Post = require("./Post");

describe("Post class", () => {
  it("has a constructor that sets id, content, title, and author", () => {
    const post = new Post(1, "content", "title", "author");
    expect(post).toEqual({
      id: 1,
      content: "content",
      title: "title",
      author: "author",
    });
  });
  it("has a method getId that returns the id", () => {
    const post = new Post(1, "content", "title", "author");
    expect(post.getId()).toBe(1);
  });
  it("has a method setId that sets the id", () => {
    const post = new Post(1, "content", "title", "author");
    post.setId(2);
    expect(post.getId()).toBe(2);
  });
  it("has a method getContent that returns the content", () => {
    const post = new Post(1, "content", "title", "author");
    expect(post.getContent()).toBe("content");
  });
  it("has a method setContent that sets the content", () => {
    const post = new Post(1, "content", "title", "author");
    post.setContent("new content");
    expect(post.getContent()).toBe("new content");
  });
  it("has a method getTitle that returns the title", () => {
    const post = new Post(1, "content", "title", "author");
    expect(post.getTitle()).toBe("title");
  });
  it("has a method setTitle that sets the title", () => {
    const post = new Post(1, "content", "title", "author");
    post.setTitle("new title");
    expect(post.getTitle()).toBe("new title");
  });
  it("has a method getAuthor that returns the author", () => {
    const post = new Post(1, "content", "title", "author");
    expect(post.getAuthor()).toBe("author");
  });
  it("has a method setAuthor that sets the author", () => {
    const post = new Post(1, "content", "title", "author");
    post.setAuthor("new author");
    expect(post.getAuthor()).toBe("new author");
  });
});
