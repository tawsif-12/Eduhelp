const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  youtubeUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+/.test(v);
      },
      message: 'Please provide a valid YouTube URL'
    }
  },
  videoId: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: function() {
      return `https://img.youtube.com/vi/${this.videoId}/mqdefault.jpg`;
    }
  },
  category: {
    type: String,
    enum: ['programming', 'mathematics', 'science', 'business', 'design', 'language', 'history', 'arts', 'communication', 'other'],
    default: 'other'
  },
  tags: [{
    type: String
  }],
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    default: 'N/A'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructorName: {
    type: String,
    required: true
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    enrollments: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
LectureSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text',
  category: 1,
  status: 1
});

module.exports = mongoose.model('Lecture', LectureSchema);