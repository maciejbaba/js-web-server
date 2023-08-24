const getPosts = require("../models/Posts");

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const testPost = (post) => {
  it("is an object", () => {
    expect(typeof post).toBe("object");
  });
  it("has property id", () => {
    expect(post.id).toBeDefined();
  });
  it("property id is a string", () => {
    expect(typeof post.id).toBe("string");
  });
  it("property id is a uuid", () => {
    expect(post.id).toMatch(uuidRegex);
  });
  it("has property title", () => {
    expect(post.title).toBeDefined();
  });
  it("property title is a string", () => {
    expect(typeof post.title).toBe("string");
  });
  it("has property content", () => {
    expect(post.content).toBeDefined();
  });
  it("property content is a string", () => {
    expect(typeof post.content).toBe("string");
  });
  it("has property author", () => {
    expect(post.author).toBeDefined();
  });
  it("property author is a string", () => {
    expect(typeof post.author).toBe("string");
  });
};

describe("Posts created with Post class from data in db", () => {
  // here square root is used to limit the number of tests
  const posts = getPosts();
  for (let i = 0; i < Math.floor(Math.sqrt(posts.length)); i++) {
    testPost(posts[i]);
  }
});
