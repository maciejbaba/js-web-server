const Post = require("../models/Post");

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("Post class", () => {
  it("is a class", () => {
    expect(typeof Post.prototype.constructor).toBe("function");
  });
  it("has property id", () => {
    const post = new Post(); // create a new instance of the Post class with id property set to a uuid
    expect(post.id).toBeDefined();
  });
  it("property id is a string", () => {
    const post = new Post();
    expect(typeof post.id).toBe("string");
  });
  it("property id is a uuid", () => {
    const post = new Post();
    expect(post.id).toMatch(uuidRegex);
  });
  it("has a constructor that sets id, content, title, and author", () => {
    const post = new Post("content", "title", "author");
    expect(post).toEqual({
      id: expect.any(String),
      content: "content",
      title: "title",
      author: "author",
    });
  });
  it("has a method getId that returns the id", () => {
    const post = new Post("content", "title", "author");
    expect(post.getId()).toBe(post.id);
  });
  it("has a method getId that returns the uuid", () => {
    const post = new Post("content", "title", "author");
    expect(post.getId()).toMatch(uuidRegex);
  });
  it("has a method getContent that returns the content", () => {
    const post = new Post("content", "title", "author");
    expect(post.getContent()).toBe("content");
  });
  it("has a method setContent that sets the content", () => {
    const post = new Post("content", "title", "author");
    post.setContent("new content");
    expect(post.getContent()).toBe("new content");
  });
  it("has a method getTitle that returns the title", () => {
    const post = new Post("content", "title", "author");
    expect(post.getTitle()).toBe("title");
  });
  it("has a method setTitle that sets the title", () => {
    const post = new Post("content", "title", "author");
    post.setTitle("new title");
    expect(post.getTitle()).toBe("new title");
  });
  it("has a method getAuthor that returns the author", () => {
    const post = new Post("content", "title", "author");
    expect(post.getAuthor()).toBe("author");
  });
  it("has a method setAuthor that sets the author", () => {
    const post = new Post("content", "title", "author");
    post.setAuthor("new author");
    expect(post.getAuthor()).toBe("new author");
  });
});
