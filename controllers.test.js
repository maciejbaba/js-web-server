const { getAllPosts, getPostById, createPost, updatePost } = require('./controllers');

describe('controllers', () => {
  it('should be an function', () => {
    expect(typeof getAllPosts).toBe('function');
  });
});