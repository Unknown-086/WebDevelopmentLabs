const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor
} = require('../cotrollers/postController');

// Routes
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/author/:authorId', getPostsByAuthor);

module.exports = router;
