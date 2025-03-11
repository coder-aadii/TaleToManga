const express = require('express');
const { check } = require('express-validator');
const mangaController = require('../controllers/mangaController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   POST /api/manga/generate
// @desc    Generate manga from story
// @access  Private
router.post(
  '/generate',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('story', 'Story is required').not().isEmpty()
  ],
  mangaController.generateManga
);

// @route   GET /api/manga
// @desc    Get all manga for current user
// @access  Private
router.get('/', mangaController.getUserManga);

// @route   GET /api/manga/:id
// @desc    Get manga by ID
// @access  Private
router.get('/:id', mangaController.getMangaById);

// @route   PUT /api/manga/:id
// @desc    Update manga
// @access  Private
router.put('/:id', mangaController.updateManga);

// @route   DELETE /api/manga/:id
// @desc    Delete manga
// @access  Private
router.delete('/:id', mangaController.deleteManga);

module.exports = router; 