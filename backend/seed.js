const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');
const Category = require('./models/Category');


const categories = [
  { name: 'Programming' },
  { name: 'Data Science' },
  { name: 'Design' },
  { name: 'Business' },
  { name: 'Personal Development' },
];

const courses = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React.js and build interactive UIs for modern web applications in Bangladesh.',
    category: 'Programming',
    difficulty: 'Beginner',
    certification: true,
    rating: 4.7,
    duration: '8h',
    studentsEnrolled: 1200,
    instructor: { name: 'Asif Rahman' },
    price: 2500,
    tags: ['react', 'frontend', 'javascript']
  },
  {
    title: 'Data Analysis with Python',
    description: 'Analyze data using Python libraries like pandas and numpy. Perfect for Bangladesh\'s growing tech industry.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    certification: true,
    rating: 4.8,
    duration: '10h',
    studentsEnrolled: 900,
    instructor: { name: 'Dr. Mahbub Hasan' },
    price: 3000,
    tags: ['python', 'data', 'pandas']
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Master the basics of user interface and user experience design with focus on Bangladesh market.',
    category: 'Design',
    difficulty: 'Beginner',
    certification: false,
    rating: 4.5,
    duration: '6h',
    studentsEnrolled: 700,
    instructor: { name: 'Fatima Sultana' },
    price: 2000,
    tags: ['design', 'ui', 'ux']
  }
];



async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Category.deleteMany();
    await Course.deleteMany();

    await Category.insertMany(categories);
    await Course.insertMany(courses);

    console.log('Database seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();