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
    tags: ['react', 'frontend', 'javascript'],
    videos: [
      {
        title: 'React Tutorial for Beginners',
        description: 'Complete React tutorial covering components, props, and state management.',
        youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        duration: '3h 30m',
        order: 1
      },
      {
        title: 'React Hooks Explained',
        description: 'Learn React Hooks including useState, useEffect, and custom hooks.',
        youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        duration: '1h 45m',
        order: 2
      },
      {
        title: 'Building a React App',
        description: 'Build a complete React application from scratch with modern best practices.',
        youtubeUrl: 'https://www.youtube.com/watch?v=hQAHSlTtcmY',
        duration: '2h 15m',
        order: 3
      }
    ]
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
    tags: ['python', 'data', 'pandas'],
    videos: [
      {
        title: 'Python for Data Analysis - Complete Course',
        description: 'Learn Python fundamentals for data analysis with pandas and numpy.',
        youtubeUrl: 'https://www.youtube.com/watch?v=r-uOLxNrNk8',
        duration: '4h 20m',
        order: 1
      },
      {
        title: 'Pandas Tutorial - Data Manipulation',
        description: 'Master pandas for data cleaning, transformation, and analysis.',
        youtubeUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: '3h 10m',
        order: 2
      },
      {
        title: 'Data Visualization with Python',
        description: 'Create stunning visualizations using matplotlib and seaborn.',
        youtubeUrl: 'https://www.youtube.com/watch?v=UO98lJQ3QGI',
        duration: '2h 30m',
        order: 3
      }
    ]
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
    tags: ['design', 'ui', 'ux'],
    videos: [
      {
        title: 'UI/UX Design Tutorial for Beginners',
        description: 'Learn the fundamentals of user interface and user experience design.',
        youtubeUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
        duration: '2h 45m',
        order: 1
      },
      {
        title: 'Figma Tutorial - Complete Course',
        description: 'Master Figma for creating professional UI/UX designs.',
        youtubeUrl: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
        duration: '1h 55m',
        order: 2
      },
      {
        title: 'UX Research Methods',
        description: 'Learn essential UX research techniques for better user experiences.',
        youtubeUrl: 'https://www.youtube.com/watch?v=Qq3OiHQ-HCU',
        duration: '1h 20m',
        order: 3
      }
    ]
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