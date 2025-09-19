const express = require('express');
const router = express.Router();
const CommunityStatus = require('../models/CommunityStatus');
const { auth } = require('../middleware/auth');

// Get all community statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await CommunityStatus.find().populate('updatedBy', 'name email role');
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new community status (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const { status } = req.body;
    const newStatus = new CommunityStatus({
      status,
      updatedBy: req.user.userId
    });
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update community status (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const { status } = req.body;
    const updatedStatus = await CommunityStatus.findByIdAndUpdate(
      req.params.id,
      { status, updatedBy: req.user.userId, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.json(updatedStatus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete community status (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const deleted = await CommunityStatus.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.json({ message: 'Status deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
