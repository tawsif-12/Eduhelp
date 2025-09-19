const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, teacherAuth, studentAuth } = require('../middleware/auth');

// GET all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      profile: profile || {},
      badges: role === 'teacher' ? ['New Educator'] : ['New Member']
    });

    const savedUser = await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id, 
        email: savedUser.email, 
        userType: savedUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user without password
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // TEST MODE: Bypass DB for admin login
    if (
      email === 'irfan.cse.20230104064@aust.edu' &&
      password === 'admin123'
    ) {
      const fakeAdmin = {
        _id: 'admin-fake-id',
        name: 'Admin',
        email,
        role: 'admin',
        profile: { bio: 'Platform administrator' },
        stats: {},
        badges: [],
        joinedDate: new Date().toISOString(),
      };
      const token = jwt.sign(
        {
          userId: fakeAdmin._id,
          email: fakeAdmin.email,
          userType: fakeAdmin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        message: 'Login successful',
        token,
        user: fakeAdmin,
      });
    }
    // ...existing code for normal login...
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        userType: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, profile, stats } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (profile) updateData.profile = { ...profile };
    if (stats) updateData.stats = { ...stats };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET teachers only
router.get('/role/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
      .select('-password')
      .sort({ 'stats.studentsEnrolled': -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Protected route to test JWT authentication
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;