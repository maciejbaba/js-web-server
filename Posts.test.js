const Posts = require("./Posts");

describe("Posts created with Post class from data in db", () => {
  it("it has property id", () => {
    expect(Posts[0].id).toBeDefined();
  });
  it("property id is a number", () => {
    expect(typeof Posts[0].id).toBe("number");
  });
  it("it has property title", () => {
    expect(Posts[0].title).toBeDefined();
  });
  it("property title is a string", () => {
    expect(typeof Posts[0].title).toBe("string");
  });
  it("it has property content", () => {
    expect(Posts[0].content).toBeDefined();
  });
  it("property content is a string", () => {
    expect(typeof Posts[0].content).toBe("string");
  });
  it("it has property author", () => {
    expect(Posts[0].author).toBeDefined();
  });
  it("property author is a string", () => {
    expect(typeof Posts[0].author).toBe("string");
  });
});
