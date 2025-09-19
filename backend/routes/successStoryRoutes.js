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


const { auth } = require('../middleware/auth');

// Create success story (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const successStory = new SuccessStory(req.body);
    const savedStory = await successStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update success story (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const updated = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Success story not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete success story (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const deleted = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Success story not found' });
    }
    res.json({ message: 'Success story deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;