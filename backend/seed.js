const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const Category = require('./models/Category');
const SuccessStory = require('./modals/SuccessStory');

const successStories = [
  {
    name: 'Rashida Akter',
    position: 'Software Engineer at Brain Station 23',
    story: 'This platform helped me land my dream job! The React course was comprehensive and practical. Now I work at one of Bangladesh\'s top IT companies.',
    course: 'React for Beginners',
    featured: true,
    rating: 5
  },
  {
    name: 'Mohammad Rahman',
    position: 'Senior Data Analyst at Grameenphone',
    story: 'The data science courses are top-notch. I learned Python from scratch and now I analyze telecom data for Bangladesh\'s largest mobile operator.',
    course: 'Data Analysis with Python',
    featured: true,
    rating: 5
  },
  {
    name: 'Fatima Khan',
    position: 'UI/UX Designer at Pathao',
    story: 'I loved the design curriculum and the community. The feedback from instructors was invaluable. Now I design for Bangladesh\'s leading ride-sharing app.',
    course: 'UI/UX Design Fundamentals',
    featured: true,
    rating: 4
  },
  {
    name: 'Tanvir Ahmed',
    position: 'Full Stack Developer at Robi Axiata',
    story: 'Started as a complete beginner and now I build full-stack applications for one of Bangladesh\'s major telecom companies. The learning path was perfect.',
    course: 'Full Stack Development',
    featured: false,
    rating: 5
  },
  {
    name: 'Nusrat Jahan',
    position: 'Product Manager at bKash',
    story: 'The business courses gave me the skills to transition from developer to product management at Bangladesh\'s leading mobile financial service.',
    course: 'Product Management Essentials',
    featured: false,
    rating: 4
  }
];


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
  await SuccessStory.deleteMany();

  await Category.insertMany(categories);
  await Course.insertMany(courses);
  await SuccessStory.insertMany(successStories);

  console.log('Database seeded!');
  process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();