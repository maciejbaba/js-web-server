const PostModel = require("./PostModel");
const Post = require("./Post");

const getPosts = require("./Posts");
const oldPosts = getPosts();
const fs = require("fs");
const name = "postsData.json";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("PostModel class", () => {
  afterAll(() => {
    fs.writeFileSync(name, JSON.stringify(oldPosts)); // restore db
  });

  it("is a class", () => {
    expect(typeof PostModel.prototype.constructor).toBe("function");
  });
  it("extends Post", () => {
    expect(PostModel.prototype instanceof Post).toBe(true);
  });
  describe("constructor", () => {
    it("has a constructor that sets uuid as id, content, title, and author", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      expect(post).toEqual({
        id: expect.any(String),
        content: "content",
        title: "title",
        author: "author",
      });
      expect(post.getId()).toMatch(uuidRegex);
    });
  });
  describe("getData", () => {
    it("has a getData method", () => {
      expect(typeof PostModel.prototype.getData).toBe("function");
    });
    it("has a getData method that returns an object with uuid as id, content, title, and author", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      expect(post.getData()).toEqual({
        id: expect.any(String),
        content: "content",
        title: "title",
        author: "author",
      });
      expect(post.getId()).toMatch(uuidRegex);
    });
  });
  describe("getById", () => {
    it("has a getById method", () => {
      expect(typeof PostModel.getById).toBe("function");
    });
    it("has a getById method that returns the post", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      PostModel.add(post);
      expect(PostModel.getById(post.getId())).toEqual(post);
      PostModel.delete(post.getId());
    });
    it("has a getById method that returns 'Post not found' if the post doesn't exist", () => {
      expect(PostModel.getById("not a uuid")).toBe("Post not found");
    });
  });
  describe("update", () => {
    it("has an update method", () => {
      expect(typeof PostModel.update).toBe("function");
    });
    it("has an update method that updates the post", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      PostModel.add(post);
      post.setTitle("updated title");
      post.setContent("updated content");
      post.setAuthor("updated author");
      const updatedPost = post.getData();
      PostModel.update(updatedPost);
      expect(PostModel.getById(post.getId())).toEqual(updatedPost);
    });
    it("has an update method that returns 'Post not found' if the post doesn't exist", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      }); // no call to PostModel.add so post doesn't exist in db
      expect(PostModel.update(post)).toBe("Post not found");
    });
  });
  describe("add", () => {
    it("has an add method", () => {
      expect(typeof PostModel.add).toBe("function");
    });
    it("has an add method that adds the post", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      PostModel.add(post);
      expect(PostModel.getById(post.getId())).toEqual(post);
      PostModel.delete(post.getId());
    });
    it("has an add method that returns 'Not a post' if the post is not an instance of PostModel or Post", () => {
      const post = {
        title: "title",
        content: "content",
        author: "author",
      };
      expect(PostModel.add(post)).toBe("Not a post");
    });
    it("has an add method that returns 'Missing title' if the post has no title", () => {
      const post = new PostModel({
        content: "content",
        author: "author",
      });
      expect(PostModel.add(post)).toBe("Missing title");
    });
    it("has an add method that returns 'Missing content' if the post has no content", () => {
      const post = new PostModel({
        title: "title",
        author: "author",
      });
      expect(PostModel.add(post)).toBe("Missing content");
    });
    it("has an add method that returns 'Missing author' if the post has no author", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
      });
      expect(PostModel.add(post)).toBe("Missing author");
    });
  });
  describe("delete", () => {
    it("has a delete method", () => {
      expect(typeof PostModel.delete).toBe("function");
    });
    it("has a delete method that deletes the post", () => {
      const post = new PostModel({
        title: "title",
        content: "content",
        author: "author",
      });
      PostModel.add(post);
      PostModel.delete(post.getId());
      expect(PostModel.getById(post.getId())).toBe("Post not found");
    });
    it("has a delete method that returns 'Post not found' if the post doesn't exist", () => {
      expect(PostModel.delete("not a uuid")).toBe("Post not found");
    });
  });
});
