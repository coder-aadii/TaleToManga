const { validationResult } = require('express-validator');
const Manga = require('../models/Manga');
const User = require('../models/User');
const { processStoryToManga } = require('../utils/huggingFaceApi');

// Helper function to generate manga panels from story
// This would integrate with Hugging Face API in production
const generateMangaPanels = async (story) => {
  // Mock implementation for development
  // In production, this would call the Hugging Face API
  
  // Split story into segments for panels
  const storySegments = story.split(/[.!?]+/).filter(segment => segment.trim().length > 0);
  
  // Generate panels (mock data)
  const panels = storySegments.slice(0, 5).map((segment, index) => {
    return {
      imageUrl: `https://via.placeholder.com/600x800?text=Manga+Panel+${index + 1}`,
      order: index + 1,
      prompt: segment.trim()
    };
  });
  
  return panels;
};

// @route   POST /api/manga/generate
// @desc    Generate manga from story
// @access  Private
exports.generateManga = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, story } = req.body;

  try {
    // Generate manga panels using Hugging Face API
    console.log('Starting manga generation for story:', story.substring(0, 100) + '...');
    const panels = await processStoryToManga(story);
    
    if (!panels || panels.length === 0) {
      throw new Error('No panels were generated');
    }

    console.log(`Successfully generated ${panels.length} panels`);
    
    // Create new manga
    const manga = new Manga({
      title,
      story,
      panels,
      creator: req.userId,
      isPublic: true
    });
    
    // Save manga to database
    const savedManga = await manga.save();
    console.log('Saved manga to database with ID:', savedManga._id);
    
    // Add manga to user's creations
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { mangaCreations: savedManga._id } }
    );
    
    res.status(201).json(savedManga);
  } catch (error) {
    console.error('Generate manga error:', error.message);
    
    // Send a more detailed error message to the client
    res.status(500).json({ 
      error: 'Failed to generate manga',
      details: error.message,
      code: error.response?.status || 500
    });
  }
};

// @route   GET /api/manga
// @desc    Get all manga for current user
// @access  Private
exports.getUserManga = async (req, res) => {
  try {
    const manga = await Manga.find({ creator: req.userId }).sort({ createdAt: -1 });
    res.json(manga);
  } catch (error) {
    console.error('Get user manga error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   GET /api/manga/:id
// @desc    Get manga by ID
// @access  Private
exports.getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    
    if (!manga) {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    console.log('Manga creator:', manga.creator.toString());
    console.log('Request userId:', req.userId);
    
    // Check if user is creator or manga is public
    if (manga.creator.toString() !== req.userId && !manga.isPublic) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    res.json(manga);
  } catch (error) {
    console.error('Get manga by ID error:', error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   PUT /api/manga/:id
// @desc    Update manga
// @access  Private
exports.updateManga = async (req, res) => {
  const { title, isPublic } = req.body;
  
  try {
    let manga = await Manga.findById(req.params.id);
    
    if (!manga) {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    // Check if user is creator
    if (manga.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Update fields
    if (title) manga.title = title;
    if (isPublic !== undefined) manga.isPublic = isPublic;
    
    await manga.save();
    
    res.json(manga);
  } catch (error) {
    console.error('Update manga error:', error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   DELETE /api/manga/:id
// @desc    Delete manga
// @access  Private
exports.deleteManga = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    
    if (!manga) {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    // Check if user is creator
    if (manga.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    // Remove manga from user's creations
    await User.findByIdAndUpdate(
      req.userId,
      { $pull: { mangaCreations: manga._id } }
    );
    
    // Delete manga
    await Manga.deleteOne({ _id: manga._id });
    
    res.json({ msg: 'Manga deleted' });
  } catch (error) {
    console.error('Delete manga error:', error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Manga not found' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
}; 