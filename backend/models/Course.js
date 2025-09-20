const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  difficulty: String,
  certification: Boolean,
  rating: Number,
  duration: String,
  studentsEnrolled: Number,
  instructor: {
    name: String,
    bio: String
  },
  price: Number,
  tags: [String],
  lessons: Number,
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  thumbnail: String,
  videos: [{
    title: String,
    description: String,
    youtubeUrl: String,
    duration: String,
    order: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
