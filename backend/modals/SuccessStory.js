const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  story: { type: String, required: true },
  course: { type: String, required: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 5 }
});

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);