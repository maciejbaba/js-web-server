const { server } = require("./server");
const { request } = require("supertest");

describe("server", () => {
  it("should be an object", () => {
    expect(typeof server).toBe("object");
  });
});