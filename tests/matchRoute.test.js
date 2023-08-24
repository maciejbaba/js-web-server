const matchRoute = require("../routes/matchRoute");
const routes = require("../routes/routes");

describe("matchRoute", () => {
  it("should be a function", () => {
    expect(typeof matchRoute).toBe("function");
  });
  describe("GET", () => {
    it("should return null if no route is matched", () => {
      const matchedRoute = matchRoute("GET", "/foo");
      expect(matchedRoute).toBeNull();
    });
    it("should return an object if a route is matched", () => {
      const matchedRoute = matchRoute("GET", "/posts");
      expect(typeof matchedRoute).toBe("object");
    });
    it("should return an object with a handler and without params", () => {
      const matchedRoute = matchRoute("GET", "/posts");
      expect(matchedRoute.handler).toBeDefined();
      expect(matchedRoute.params).toEqual({});
    });
    it("should return the correct handler and no params", () => {
      const matchedRoute = matchRoute("GET", "/posts");
      expect(matchedRoute.handler).toBe(routes["GET/posts"]);
      expect(matchedRoute.params).toEqual({});
    });
    it("should work without leading slash", () => {
      const matchedRoute = matchRoute("GET", "posts");
      expect(matchedRoute.handler).toBe(routes["GET/posts"]);
      expect(matchedRoute.params).toEqual({});
    });
    it("should return the correct params and handler", () => {
      const matchedRoute = matchRoute("GET", "/posts/1");
      expect(matchedRoute.handler).toBe(routes["GET/posts/:id"]);
      expect(matchedRoute.params).toEqual({ id: "1" });
    });
  });
  describe("POST", () => {
    it("should return the correct params and handler for a different route", () => {
      const matchedRoute = matchRoute("POST", "/posts");
      expect(matchedRoute.handler).toBe(routes["POST/posts"]);
      expect(matchedRoute.params).toEqual({});
    });
  });
  describe("PUT", () => {
    it("should return the correct params and handler for a different route", () => {
      const matchedRoute = matchRoute("PUT", "/posts/2");
      expect(matchedRoute.handler).toBe(routes["PUT/posts/:id"]);
      expect(matchedRoute.params).toEqual({ id: "2" });
    });
  });
  describe("DELETE", () => {
    it("should return the correct params and handler for a different route", () => {
      const matchedRoute = matchRoute("DELETE", "/posts/3");
      expect(matchedRoute.handler).toBe(routes["DELETE/posts/:id"]);
      expect(matchedRoute.params).toEqual({ id: "3" });
    });
  });
});
