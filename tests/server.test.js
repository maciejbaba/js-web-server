const { server } = require("../server");
const request = require("supertest");
const fs = require("fs");
const name = "db/postsData.json";
const getPosts = require("../models/Posts");

const oldPosts = getPosts();

describe("server", () => {
  afterAll(() => {
    fs.writeFileSync(name, JSON.stringify(oldPosts)); // reset postsData.json
  });
  it("should be an object", () => {
    expect(typeof server).toBe("object");
  });
  describe("GET", () => {
    describe("GET /", () => {
      it("should return status code 200 OK", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
      });
      it("should return plain text", async () => {
        const response = await request(server).get("/");
        expect(response.type).toBe("text/plain");
      });
      it("should return 'Hello World'", async () => {
        const response = await request(server).get("/");
        expect(response.text).toBe("Hello World");
      });
    });
    describe("GET /foo (route that doesn't exist)", () => {
      it("should return status code 404 Not Found", async () => {
        const response = await request(server).get("/foo");
        expect(response.status).toBe(404);
      });
      it("should return plain text", async () => {
        const response = await request(server).get("/foo");
        expect(response.type).toBe("text/plain");
      });
      it("should return '404 Not Found'", async () => {
        const response = await request(server).get("/foo");
        expect(response.text).toBe("404 Not Found");
      });
    });
    describe("GET /posts", () => {
      it("should return status code 200 OK", async () => {
        const response = await request(server).get("/posts");
        expect(response.status).toBe(200);
      });
      it("should return JSON", async () => {
        const response = await request(server).get("/posts");
        expect(response.type).toBe("application/json");
      });
      it("should return an array", async () => {
        const response = await request(server).get("/posts");
        expect(Array.isArray(response.body)).toBe(true);
      });
      it("should return an array of posts", async () => {
        const response = await request(server).get("/posts");
        expect(response.body[0]).toEqual({
          id: expect.any(String),
          title: expect.any(String),
          content: expect.any(String),
          author: expect.any(String),
        });
      });
    });
    describe("GET /posts/:id", () => {
      it("should return status code 200 OK", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).get(`/posts/${postId}`);
        expect(response.status).toBe(200);
      });
      it("should return JSON", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).get(`/posts/${postId}`);
        expect(response.type).toBe("application/json");
      });
      it("should return a post", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).get(`/posts/${postId}`);
        expect(response.body).toEqual({
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author,
        });
      });
      it("should return status code 404 Not Found", async () => {
        const response = await request(server).get("/posts/not-a-real-id");
        expect(response.status).toBe(404);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("404 Not Found");
      });
    });
    describe("POST /posts", () => {
      it("should return status code 201 Created", async () => {
        const response = await request(server).post("/posts").send({
          title: "Test Post",
          content: "This is a test post",
          author: "Test Author",
        });
        expect(response.status).toBe(201);
      });
      it("should return JSON", async () => {
        const response = await request(server).post("/posts").send({
          title: "Test Post",
          content: "This is a test post",
          author: "Test Author",
        });
        expect(response.type).toBe("application/json");
      });
      it("should return the new post", async () => {
        const response = await request(server).post("/posts").send({
          title: "Test Post",
          content: "This is a test post",
          author: "Test Author",
        });
        expect(response.body).toEqual({
          id: expect.any(String),
          title: "Test Post",
          content: "This is a test post",
          author: "Test Author",
        });
      });
      it("should return status code 400 Bad Request if title is missing", async () => {
        const response = await request(server).post("/posts").send({
          content: "This is a test post",
          author: "Test Author",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing title");
      });
      it("should return status code 400 Bad Request if content is missing", async () => {
        const response = await request(server).post("/posts").send({
          title: "Test Post",
          author: "Test Author",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing content");
      });
      it("should return status code 400 Bad Request if author is missing", async () => {
        const response = await request(server).post("/posts").send({
          title: "Test Post",
          content: "This is a test post",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing author");
      });
    });
    describe("PUT /posts/:id", () => {
      it("should return status code 200 OK", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).put(`/posts/${postId}`).send({
          title: "Updated Test Post",
          content: "This is a updated test post",
          author: "Updated Test Author",
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual({
          id: postId,
          title: "Updated Test Post",
          content: "This is a updated test post",
          author: "Updated Test Author",
        });
      });
      it("should return status code 400 Bad Request if ID is missing", async () => {
        const response = await request(server).put("/posts").send({
          // bad route so the server will return 404 Not Found
          title: "Updated Test Post",
          content: "This is a updated test post",
          author: "Updated Test Author",
        });
        expect(response.status).toBe(404);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("404 Not Found");
      });
      it("should return status code 404 Not Found if ID doesn't exist", async () => {
        const response = await request(server)
          .put("/posts/not-a-real-id")
          .send({
            title: "Updated Test Post",
            content: "This is a updated test post",
            author: "Updated Test Author",
          });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Invalid ID");
      });
      it("should return status code 400 Bad Request if title is missing", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).put(`/posts/${postId}`).send({
          content: "This is a updated test post",
          author: "Updated Test Author",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing title");
      });
      it("should return status code 400 Bad Request if content is missing", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).put(`/posts/${postId}`).send({
          title: "Updated Test Post",
          author: "Updated Test Author",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing content");
      });
      it("should return status code 400 Bad Request if author is missing", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).put(`/posts/${postId}`).send({
          title: "Updated Test Post",
          content: "This is a updated test post",
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Missing author");
      });
    });
    describe("DELETE /posts/:id", () => {
      it("should return status code 200 OK", async () => {
        const postsRes = await request(server).get("/posts");
        const post = postsRes.body[0];
        const postId = post.id;
        const response = await request(server).delete(`/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual({
          id: postId,
          title: post.title,
          content: post.content,
          author: post.author,
        });
      });
      it("should return status code 404 Not Found if ID is missing", async () => {
        const response = await request(server).delete("/posts"); // bad route so the server will return 404 Not Found
        expect(response.status).toBe(404);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("404 Not Found");
      });
      it("should return status code 400 Not Found if ID doesn't exist", async () => {
        const response = await request(server).delete("/posts/not-a-real-id");
        expect(response.status).toBe(400);
        expect(response.type).toBe("text/plain");
        expect(response.text).toBe("400 Invalid ID");
      });
    });
  });
});
