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
    name: String
  },
  price: Number,
  tags: [String]
});

module.exports = mongoose.model('Course', CourseSchema);
