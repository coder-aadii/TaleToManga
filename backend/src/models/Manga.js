const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  story: {
    type: String,
    required: true,
  },
  panels: [{
    imageUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
});

// Index for faster queries
mangaSchema.index({ creator: 1, createdAt: -1 });
mangaSchema.index({ isPublic: 1, createdAt: -1 });

module.exports = mongoose.model('Manga', mangaSchema); 