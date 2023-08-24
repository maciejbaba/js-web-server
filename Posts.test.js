const Posts = require("./Posts");

const testPost = (post) => {
  it("is an object", () => {
    expect(typeof post).toBe("object");
  });
  it("has property id", () => {
    expect(post.id).toBeDefined();
  });
  it("property id is a number", () => {
    expect(typeof post.id).toBe("number");
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
  for (let i = 0; i < Posts.length; i++) {
    testPost(Posts[i]);
  }
});
