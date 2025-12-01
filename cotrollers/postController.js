const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
const createPost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    
    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({ 
        message: 'Please provide title, content, and author' 
      });
    }
    
    const post = await Post.create({ title, content, author });
    
    // Populate author details in response
    await post.populate('author');
    
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Public
const updatePost = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    
    // Validate input
    if (!title && !content && !author) {
      return res.status(400).json({ 
        message: 'Please provide at least one field to update' 
      });
    }
    
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Public
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get posts by author
// @route   GET /api/posts/author/:authorId
// @access  Public
const getPostsByAuthor = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.params.authorId }).populate('author');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor
};
