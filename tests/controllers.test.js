const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/controllers');

describe('controllers', () => {
  describe('getAllPosts', () => {
    it('should be a function', () => {
      expect(typeof getAllPosts).toBe('function');
    });
  });
  describe('getPostById', () => {
    it('should be a function', () => {
      expect(typeof getPostById).toBe('function');
    });
  });
  describe('createPost', () => {
    it('should be a function', () => {
      expect(typeof createPost).toBe('function');
    });
  });
  describe('updatePost', () => {
    it('should be a function', () => {
      expect(typeof updatePost).toBe('function');
    });
  });
  describe('deletePost', () => {
    it('should be a function', () => {
      expect(typeof deletePost).toBe('function');
    });
  });
});