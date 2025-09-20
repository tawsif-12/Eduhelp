const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const Lecture = require('./models/Lecture');
const User = require('./models/User');

const sampleLectures = [
  // React Course Lectures
  {
    title: 'Introduction to React',
    description: 'Learn the basics of React and why it\'s popular for building user interfaces.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    videoId: 'Tn6-PIqc4UM',
    category: 'programming',
    level: 'Beginner',
    duration: '15 min',
    courseName: 'React for Beginners'
  },
  {
    title: 'React Components and Props',
    description: 'Understanding components and how to pass data between them using props.',
    youtubeUrl: 'https://www.youtube.com/watch?v=5fAMGfxAYDQ',
    videoId: '5fAMGfxAYDQ',
    category: 'programming',
    level: 'Beginner',
    duration: '20 min',
    courseName: 'React for Beginners'
  },
  {
    title: 'React State and Hooks',
    description: 'Learn about state management in React using useState and other hooks.',
    youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
    videoId: 'O6P86uwfdR0',
    category: 'programming',
    level: 'Beginner',
    duration: '25 min',
    courseName: 'React for Beginners'
  },
  // Data Science Course Lectures
  {
    title: 'Python Data Types and Variables',
    description: 'Understanding different data types in Python for data analysis.',
    youtubeUrl: 'https://www.youtube.com/watch?v=khKv-8q7YmY',
    videoId: 'khKv-8q7YmY',
    category: 'mathematics',
    level: 'Intermediate',
    duration: '18 min',
    courseName: 'Data Analysis with Python'
  },
  {
    title: 'Introduction to Pandas',
    description: 'Learn the basics of pandas library for data manipulation and analysis.',
    youtubeUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
    videoId: 'vmEHCJofslg',
    category: 'mathematics',
    level: 'Intermediate',
    duration: '30 min',
    courseName: 'Data Analysis with Python'
  },
  // Design Course Lectures
  {
    title: 'Design Principles Fundamentals',
    description: 'Learn the core principles of good design: contrast, repetition, alignment, and proximity.',
    youtubeUrl: 'https://www.youtube.com/watch?v=a5KYlHNKQB8',
    videoId: 'a5KYlHNKQB8',
    category: 'design',
    level: 'Beginner',
    duration: '22 min',
    courseName: 'UI/UX Design Fundamentals'
  },
  {
    title: 'Understanding User Experience',
    description: 'Introduction to UX design and user-centered design processes.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ovj4hFxko7c',
    videoId: 'Ovj4hFxko7c',
    category: 'design',
    level: 'Beginner',
    duration: '28 min',
    courseName: 'UI/UX Design Fundamentals'
  }
];

async function seedLectures() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find or create a default instructor
    let instructor = await User.findOne({ role: 'teacher' });
    if (!instructor) {
      instructor = new User({
        name: 'Default Instructor',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'teacher',
        profile: {
          institution: 'EduHelp Academy',
          subject: 'Computer Science'
        }
      });
      await instructor.save();
      console.log('Created default instructor');
    }

    // Get all courses
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses`);

    // Clear existing lectures
    await Lecture.deleteMany();
    console.log('Cleared existing lectures');

    // Create lectures for each course
    for (const course of courses) {
      const courseLectures = sampleLectures.filter(lecture => lecture.courseName === course.title);
      
      for (const lectureData of courseLectures) {
        const lecture = new Lecture({
          title: lectureData.title,
          description: lectureData.description,
          youtubeUrl: lectureData.youtubeUrl,
          videoId: lectureData.videoId,
          category: lectureData.category,
          level: lectureData.level,
          duration: lectureData.duration,
          instructor: instructor._id,
          instructorName: instructor.name,
          courseId: course._id,
          stats: {
            views: Math.floor(Math.random() * 1000),
            likes: Math.floor(Math.random() * 100),
            enrollments: Math.floor(Math.random() * 50)
          }
        });

        await lecture.save();
        console.log(`Created lecture: ${lecture.title} for course: ${course.title}`);
      }
    }

    console.log('Lectures seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding lectures:', err);
    process.exit(1);
  }
}

seedLectures();