const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

const teacherAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.userType !== 'teacher') {
      return res.status(403).json({ error: 'Access denied. Teacher privileges required.' });
    }
    next();
  });
};

const studentAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.userType !== 'student') {
      return res.status(403).json({ error: 'Access denied. Student privileges required.' });
    }
    next();
  });
};

module.exports = { auth, teacherAuth, studentAuth };