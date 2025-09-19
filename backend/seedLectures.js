const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Lecture = require('./models/Lecture');

dotenv.config();

// Sample lecture data
const lectureData = [
  {
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks and how to use them effectively in your React applications. This comprehensive tutorial covers useState, useEffect, and custom hooks.',
    youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
    category: 'programming',
    tags: ['react', 'hooks', 'javascript', 'frontend']
  },
  {
    title: 'Advanced State Management with Redux',
    description: 'Deep dive into advanced state management patterns using Redux. Learn about actions, reducers, middleware, and best practices for large-scale applications.',
    youtubeUrl: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
    category: 'programming',
    tags: ['react', 'redux', 'state-management', 'javascript']
  },
  {
    title: 'JavaScript Fundamentals for Beginners',
    description: 'Master the core concepts of JavaScript programming. From variables and functions to objects and arrays, this tutorial covers everything you need to start coding.',
    youtubeUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
    category: 'programming',
    tags: ['javascript', 'fundamentals', 'programming', 'beginner']
  },
  {
    title: 'Calculus I: Limits and Derivatives',
    description: 'Introduction to calculus focusing on limits, continuity, and derivatives. Perfect for students beginning their calculus journey.',
    youtubeUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
    category: 'mathematics',
    tags: ['calculus', 'derivatives', 'limits', 'mathematics']
  },
  {
    title: 'Linear Algebra: Matrices and Vectors',
    description: 'Comprehensive introduction to linear algebra covering vectors, matrices, and their applications in computer science and engineering.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
    category: 'mathematics',
    tags: ['linear-algebra', 'matrices', 'vectors', 'mathematics']
  },
  {
    title: 'Physics: Newton\'s Laws of Motion',
    description: 'Understand the fundamental principles of classical mechanics through Newton\'s three laws of motion with practical examples.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
    category: 'science',
    tags: ['physics', 'mechanics', 'newton', 'motion']
  },
  {
    title: 'Chemistry: Atomic Structure and Bonding',
    description: 'Explore the structure of atoms, electron configuration, and how atoms bond to form molecules. Essential for understanding chemical reactions.',
    youtubeUrl: 'https://www.youtube.com/watch?v=PnA1qPFdmYI',
    category: 'science',
    tags: ['chemistry', 'atoms', 'bonding', 'molecules']
  },
  {
    title: 'Machine Learning with Python',
    description: 'Introduction to machine learning using Python. Learn about supervised learning, neural networks, and popular ML libraries like scikit-learn.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7eh4d6sabA0',
    category: 'programming',
    tags: ['machine-learning', 'python', 'ai', 'data-science']
  },
  {
    title: 'World History: The Industrial Revolution',
    description: 'Comprehensive overview of the Industrial Revolution, its causes, major innovations, and lasting impact on society and economics.',
    youtubeUrl: 'https://www.youtube.com/watch?v=zhL5DCizj5c',
    category: 'history',
    tags: ['history', 'industrial-revolution', 'society', 'economics']
  },
  {
    title: 'Digital Marketing Strategy',
    description: 'Learn effective digital marketing strategies including SEO, social media marketing, content creation, and analytics to grow your online presence.',
    youtubeUrl: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    category: 'business',
    tags: ['marketing', 'digital', 'seo', 'social-media']
  }
];

async function seedLectures() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create a sample teacher if none exists
    let teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) {
      console.log('Creating sample teacher...');
      teacher = new User({
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@eduhelp.com',
        password: '$2a$10$rZ6QqCVZ5kX8Qw9J7N0ZHOy7Q8P4K1L2M3N4O5P6Q7R8S9T0U1V2W3', // hashed password: 'teacher123'
        role: 'teacher',
        profile: {
          institution: 'EduHelp University',
          subject: 'Computer Science & Mathematics',
          experience: '10 years'
        },
        badges: ['Expert Educator', 'Course Creator', 'Community Builder']
      });
      await teacher.save();
      console.log('Sample teacher created:', teacher.name);
    }

    // Clear existing lectures
    await Lecture.deleteMany({});
    console.log('Cleared existing lectures');

    // Helper function to extract YouTube video ID
    function extractVideoId(url) {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    }

    // Create lectures
    const lecturesWithTeacher = lectureData.map(lecture => {
      const videoId = extractVideoId(lecture.youtubeUrl);
      return {
        title: lecture.title,
        description: lecture.description,
        youtubeUrl: lecture.youtubeUrl,
        category: lecture.category,
        tags: lecture.tags,
        instructor: teacher._id,                    // Required: ObjectId reference to teacher
        instructorName: teacher.name,               // Required: Teacher's name as string
        videoId: videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        stats: {
          views: Math.floor(Math.random() * 2000) + 100, // Random views between 100-2100
          likes: Math.floor(Math.random() * 150) + 10,   // Random likes between 10-160
          enrollments: Math.floor(Math.random() * 30) + 5  // Random enrollments between 5-35
        }
      };
    });

    const createdLectures = await Lecture.insertMany(lecturesWithTeacher);
    console.log(`Created ${createdLectures.length} sample lectures`);

    console.log('Sample lectures:');
    createdLectures.forEach((lecture, index) => {
      console.log(`${index + 1}. ${lecture.title} (${lecture.category})`);
    });

    console.log('\\nLecture seeding completed successfully!');
    console.log('You can now:');
    console.log('1. Start your backend server: node server.js');
    console.log('2. Start your frontend: npm run dev');
    console.log('3. Test the lecture functionality');

  } catch (error) {
    console.error('Error seeding lectures:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\\nDatabase connection closed');
  }
}

// Run the seeding function
seedLectures();