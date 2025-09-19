const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const SuccessStory = require('../models/SuccessStory');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Middleware to check admin role
const adminAuth = async (req, res, next) => {
  try {
    // Check for admin role in userType (from JWT) or role field
    const userRole = req.user.userType || req.user.role;
    if (!req.user || userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Dashboard Statistics
router.get('/dashboard/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalLectures = await Lecture.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const publishedCourses = await Course.countDocuments({ status: 'published' });
    
    // Calculate completion rate (you can adjust this logic based on your progress tracking)
    const completionRate = 87; // Placeholder - implement based on your progress model
    
    // Calculate revenue (placeholder - implement based on your payment model)
    const revenue = 89240; // Placeholder
    
    // Recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt status');
    
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title instructor createdAt status');

    res.json({
      stats: {
        totalUsers,
        totalCourses,
        totalLectures,
        activeUsers,
        publishedCourses,
        completionRate,
        revenue
      },
      recentUsers,
      recentCourses
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Management Routes
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user
router.get('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Course Management Routes
router.get('/courses', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const status = req.query.status || '';

    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    const courses = await Course.find(filter)
      .populate('lectures')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(filter);

    // Add calculated fields
    const coursesWithStats = courses.map(course => ({
      ...course.toObject(),
      lectureCount: course.lectures ? course.lectures.length : 0,
      studentsCount: Math.floor(Math.random() * 300), // Placeholder - implement based on enrollment model
      rating: (Math.random() * 1.5 + 3.5).toFixed(1) // Placeholder - implement based on rating model
    }));

    res.json({
      courses: coursesWithStats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new course
router.post('/courses', auth, adminAuth, async (req, res) => {
  try {
    const courseData = req.body;
    const course = new Course({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course
router.put('/courses/:id', auth, adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete course
router.delete('/courses/:id', auth, adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Also delete associated lectures
    await Lecture.deleteMany({ courseId: req.params.id });
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Lecture Management Routes
router.get('/lectures', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const courseId = req.query.courseId || '';

    const filter = {};
    if (courseId) {
      filter.courseId = courseId;
    }

    const lectures = await Lecture.find(filter)
      .populate('courseId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Lecture.countDocuments(filter);

    res.json({
      lectures,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get lectures error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new lecture
router.post('/lectures', auth, adminAuth, async (req, res) => {
  try {
    const lecture = new Lecture({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await lecture.save();
    res.status(201).json(lecture);
  } catch (error) {
    console.error('Create lecture error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lecture
router.put('/lectures/:id', auth, adminAuth, async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    res.json(lecture);
  } catch (error) {
    console.error('Update lecture error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lecture
router.delete('/lectures/:id', auth, adminAuth, async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    console.error('Delete lecture error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Success Stories Management
router.get('/success-stories', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const stories = await SuccessStory.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SuccessStory.countDocuments();

    res.json({
      stories,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get success stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Analytics Routes
router.get('/analytics/overview', auth, adminAuth, async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const coursesByCategory = await Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      usersByRole,
      coursesByCategory,
      userGrowth
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;