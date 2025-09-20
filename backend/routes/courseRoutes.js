const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET course by ID with its lectures
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get lectures for this course
    const lectures = await Lecture.find({ courseId: req.params.id })
      .populate('instructor', 'name profile.institution')
      .sort({ createdAt: 1 });

    // Return course with its lectures
    res.json({
      ...course.toObject(),
      lectures: lectures
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
