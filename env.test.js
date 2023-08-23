describe("Environmental variables", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("PORT", () => {
    const { PORT } = require("./server");
    it("should be defined", () => {
      expect(PORT).toBeDefined();
    });
    it("should be a number", () => {
      expect(typeof PORT).toBe("number");
    });
    it("should be 3000", () => {
      expect(PORT).toBe(3000);
    });
    it("should be defined", () => {
      process.env.PORT = 5000;
      const { PORT } = require("./server");
      expect(PORT).toBeDefined();
    });
    it("should be a number", () => {
      process.env.PORT = 5000;
      const { PORT } = require("./server");
      expect(typeof PORT).toBe("number");
    });
    it("should be 5000", () => {
      process.env.PORT = 5000;
      const { PORT } = require("./server");
      expect(PORT).toBe(5000);
    });
  });
  describe("NODE_ENV", () => {
    const { NODE_ENV } = require("./server");
    console.log(NODE_ENV);
    it("should be defined", () => {
      expect(NODE_ENV).toBeDefined();
    });
    it("should be a string", () => {
      expect(typeof NODE_ENV).toBe("string");
    });
    it("should be dev", () => {
      expect(NODE_ENV).toBe("test");
    });
    it("should be defined", () => {
      process.env.NODE_ENV = "dev";
      const { NODE_ENV } = require("./server");
      expect(NODE_ENV).toBeDefined();
    });
    it("should be a string", () => {
      process.env.NODE_ENV = "dev";
      const { NODE_ENV } = require("./server");
      expect(typeof NODE_ENV).toBe("string");
    });
    it("should be test", () => {
      process.env.NODE_ENV = "dev";
      const { NODE_ENV } = require("./server");
      expect(NODE_ENV).toBe("dev");
    });
  });
});
