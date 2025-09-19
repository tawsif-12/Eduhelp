const express = require('express');
const router = express.Router();
const SuccessStory = require('../models/SuccessStory');


router.get('/', async (req, res) => {
  try {
    const successStories = await SuccessStory.find();
    res.json(successStories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/featured', async (req, res) => {
  try {
    const featuredStories = await SuccessStory.find({ featured: true });
    res.json(featuredStories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const successStory = new SuccessStory(req.body);
    const savedStory = await successStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;