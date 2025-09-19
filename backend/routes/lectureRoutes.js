const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const User = require('../models/User');
const { auth, teacherAuth } = require('../middleware/auth');

// GET all lectures
router.get('/', async (req, res) => {
  try {
    const { category, instructor, search } = req.query;
    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by instructor
    if (instructor) {
      query.instructor = instructor;
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const lectures = await Lecture.find(query)
      .populate('instructor', 'name profile.institution')
      .sort({ createdAt: -1 });
    
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET lecture by ID
router.get('/:id', async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
      .populate('instructor', 'name profile.institution profile.subject');
    
    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    // Increment view count
    lecture.views += 1;
    await lecture.save();

    res.json(lecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Create new lecture (Teachers only)
router.post('/', teacherAuth, async (req, res) => {
  try {
    const { title, description, youtubeUrl, category, instructor, thumbnail, tags } = req.body;

    // Validate YouTube URL and extract video ID
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(youtubeRegex);
    
    if (!match) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const videoId = match[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const autoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Verify instructor exists
    const instructorExists = await User.findById(instructor);
    if (!instructorExists || instructorExists.role !== 'teacher') {
      return res.status(400).json({ error: 'Invalid instructor ID' });
    }

    const lecture = new Lecture({
      title,
      description,
      youtubeUrl,
      videoId,
      embedUrl,
      thumbnail: thumbnail || autoThumbnail,
      category,
      instructor,
      instructorName: instructorExists.name,
      tags: tags || []
    });

    const savedLecture = await lecture.save();
    
    // Populate instructor info before returning
    await savedLecture.populate('instructor', 'name profile.institution');
    
    res.status(201).json(savedLecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update lecture (Teachers only)
router.put('/:id', teacherAuth, async (req, res) => {
  try {
    const { title, description, youtubeUrl, category, thumbnail, tags } = req.body;
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (thumbnail) updateData.thumbnail = thumbnail;

    // If YouTube URL is being updated, validate and extract new video ID
    if (youtubeUrl) {
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
      const match = youtubeUrl.match(youtubeRegex);
      
      if (!match) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      const videoId = match[1];
      updateData.youtubeUrl = youtubeUrl;
      updateData.videoId = videoId;
      updateData.embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      // Update thumbnail if not provided
      if (!thumbnail) {
        updateData.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'name profile.institution');

    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    res.json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET lectures by instructor ID
router.get('/instructor/:instructorId', async (req, res) => {
  try {
    const lectures = await Lecture.find({ instructor: req.params.instructorId })
      .populate('instructor', 'name profile.institution')
      .sort({ createdAt: -1 });
    
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Like lecture
router.post('/:id/like', async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { $inc: { 'stats.likes': 1 } },
      { new: true }
    ).populate('instructor', 'name profile.institution');

    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    res.json({ likes: lecture.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET popular lectures (most viewed)
router.get('/popular/top', async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('instructor', 'name profile.institution')
      .sort({ 'stats.views': -1, 'stats.likes': -1 })
      .limit(10);
    
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET lectures by category
router.get('/category/:category', async (req, res) => {
  try {
    const lectures = await Lecture.find({ category: req.params.category })
      .populate('instructor', 'name profile.institution')
      .sort({ createdAt: -1 });
    
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE lecture (Teachers only)
router.delete('/:id', teacherAuth, async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found' });
    }
    res.json({ message: 'Lecture deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;