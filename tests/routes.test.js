const routes = require("../routes/routes");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/controllers");

describe("routes", () => {
  it("should be an object", () => {
    expect(typeof routes).toBe("object");
  });
  it("should have a GET/posts property", () => {
    expect(routes["GET/posts"]).toBeDefined();
  });
  it("GET/posts should be a function", () => {
    expect(typeof routes["GET/posts"]).toBe("function");
  });
  it("GET/posts property should be getAllPosts", () => {
    expect(routes["GET/posts"]).toBe(getAllPosts);
  });
  it("should have a GET/posts/:id property", () => {
    expect(routes["GET/posts/:id"]).toBeDefined();
  });
  it("GET/posts/:id should be a function", () => {
    expect(typeof routes["GET/posts/:id"]).toBe("function");
  });
  it("GET/posts/:id property should be getPostById", () => {
    expect(routes["GET/posts/:id"]).toBe(getPostById);
  });
  it("should have a POST/posts property", () => {
    expect(routes["POST/posts"]).toBeDefined();
  });
  it("POST/posts should be a function", () => {
    expect(typeof routes["POST/posts"]).toBe("function");
  });
  it("POST/posts property should be createPost", () => {
    expect(routes["POST/posts"]).toBe(createPost);
  });
  it("should have a PUT/posts/:id property", () => {
    expect(routes["PUT/posts/:id"]).toBeDefined();
  });
  it("PUT/posts/:id should be a function", () => {
    expect(typeof routes["PUT/posts/:id"]).toBe("function");
  });
  it("PUT/posts/:id property should be updatePost", () => {
    expect(routes["PUT/posts/:id"]).toBe(updatePost);
  });
  it("should have a DELETE/posts/:id property", () => {
    expect(routes["DELETE/posts/:id"]).toBeDefined();
  });
  it("DELETE/posts/:id should be a function", () => {
    expect(typeof routes["DELETE/posts/:id"]).toBe("function");
  });
  it("DELETE/posts/:id property should be deletePost", () => {
    expect(routes["DELETE/posts/:id"]).toBe(deletePost);
  });
});
