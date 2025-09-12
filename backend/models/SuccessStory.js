const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SuccessStory', successStorySchema);