function getPosts(req, res) {
  const posts = getPosts();
  res.end(JSON.stringify(posts));
}

function getPostById(req, res) {
  const { id } = req.params;
  const post = getPost(id);
  res.end(JSON.stringify(post));
}

function createPost(req, res) {}

function updatePost(req, res) {}

function deletePost(req, res) {}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
