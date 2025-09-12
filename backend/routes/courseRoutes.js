const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optional) Add more endpoints for filtering, searching, etc.

module.exports = router;