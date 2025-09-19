const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');
const adminRoutes = require('./routes/adminRoutes');

const userRoutes = require('./routes/userRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const communityRoutes = require('./routes/communityRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/users', userRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/community', communityRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));