const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Lecture = require('./models/Lecture');
const bcrypt = require('bcryptjs');

dotenv.config();

// Sample teachers data
const teachersData = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@eduhelp.com',
    password: 'teacher123',
    profile: {
      institution: 'EduHelp University',
      subject: 'Computer Science & Mathematics',
      experience: '10 years'
    }
  },
  {
    name: 'Prof. Michael Chen',
    email: 'michael.chen@eduhelp.com',
    password: 'teacher123',
    profile: {
      institution: 'Tech Institute',
      subject: 'Programming & Software Engineering',
      experience: '8 years'
    }
  },
  {
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@eduhelp.com',
    password: 'teacher123',
    profile: {
      institution: 'Science Academy',
      subject: 'Physics & Chemistry',
      experience: '12 years'
    }
  },
  {
    name: 'Prof. David Wilson',
    email: 'david.wilson@eduhelp.com',
    password: 'teacher123',
    profile: {
      institution: 'Business School',
      subject: 'Marketing & Entrepreneurship',
      experience: '15 years'
    }
  },
  {
    name: 'Dr. Lisa Thompson',
    email: 'lisa.thompson@eduhelp.com',
    password: 'teacher123',
    profile: {
      institution: 'Liberal Arts College',
      subject: 'History & Literature',
      experience: '9 years'
    }
  }
];

// Expanded lecture data with more variety
const lectureData = [
  // Programming & Tech
  {
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks and how to use them effectively in your React applications. This comprehensive tutorial covers useState, useEffect, and custom hooks.',
    youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
    category: 'programming',
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    teacherEmail: 'sarah.johnson@eduhelp.com'
  },
  {
    title: 'Full Stack Web Development with Node.js',
    description: 'Complete guide to building full-stack applications using Node.js, Express, and MongoDB. Perfect for beginners and intermediate developers.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
    category: 'programming',
    tags: ['nodejs', 'fullstack', 'mongodb', 'express'],
    teacherEmail: 'michael.chen@eduhelp.com'
  },
  {
    title: 'Python Programming for Data Science',
    description: 'Learn Python programming specifically for data science applications. Covers pandas, numpy, matplotlib, and machine learning basics.',
    youtubeUrl: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    category: 'programming',
    tags: ['python', 'data-science', 'pandas', 'machine-learning'],
    teacherEmail: 'michael.chen@eduhelp.com'
  },
  {
    title: 'JavaScript ES6+ Modern Features',
    description: 'Master modern JavaScript features including arrow functions, destructuring, promises, async/await, and more.',
    youtubeUrl: 'https://www.youtube.com/watch?v=nZ1DMMsyVyI',
    category: 'programming',
    tags: ['javascript', 'es6', 'modern', 'async'],
    teacherEmail: 'sarah.johnson@eduhelp.com'
  },
  {
    title: 'Introduction to Machine Learning',
    description: 'Comprehensive introduction to machine learning concepts, algorithms, and practical applications using Python.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7eh4d6sabA0',
    category: 'programming',
    tags: ['machine-learning', 'python', 'ai', 'algorithms'],
    teacherEmail: 'michael.chen@eduhelp.com'
  },

  // Mathematics
  {
    title: 'Calculus I: Limits and Derivatives',
    description: 'Introduction to calculus focusing on limits, continuity, and derivatives. Perfect for students beginning their calculus journey.',
    youtubeUrl: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
    category: 'mathematics',
    tags: ['calculus', 'derivatives', 'limits', 'mathematics'],
    teacherEmail: 'sarah.johnson@eduhelp.com'
  },
  {
    title: 'Linear Algebra: Matrices and Vectors',
    description: 'Comprehensive introduction to linear algebra covering vectors, matrices, and their applications in computer science and engineering.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fNk_zzaMoSs',
    category: 'mathematics',
    tags: ['linear-algebra', 'matrices', 'vectors', 'mathematics'],
    teacherEmail: 'sarah.johnson@eduhelp.com'
  },
  {
    title: 'Statistics and Probability',
    description: 'Essential statistics and probability concepts for data analysis, including distributions, hypothesis testing, and confidence intervals.',
    youtubeUrl: 'https://www.youtube.com/watch?v=sxQaBpKfDRk',
    category: 'mathematics',
    tags: ['statistics', 'probability', 'data-analysis', 'hypothesis'],
    teacherEmail: 'sarah.johnson@eduhelp.com'
  },

  // Science
  {
    title: 'Physics: Newton\'s Laws of Motion',
    description: 'Understand the fundamental principles of classical mechanics through Newton\'s three laws of motion with practical examples.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
    category: 'science',
    tags: ['physics', 'mechanics', 'newton', 'motion'],
    teacherEmail: 'emily.rodriguez@eduhelp.com'
  },
  {
    title: 'Chemistry: Atomic Structure and Bonding',
    description: 'Explore the structure of atoms, electron configuration, and how atoms bond to form molecules. Essential for understanding chemical reactions.',
    youtubeUrl: 'https://www.youtube.com/watch?v=PnA1qPFdmYI',
    category: 'science',
    tags: ['chemistry', 'atoms', 'bonding', 'molecules'],
    teacherEmail: 'emily.rodriguez@eduhelp.com'
  },
  {
    title: 'Biology: Cell Structure and Function',
    description: 'Detailed exploration of cell biology including organelles, cellular processes, and the differences between prokaryotic and eukaryotic cells.',
    youtubeUrl: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
    category: 'science',
    tags: ['biology', 'cells', 'organelles', 'cellular-processes'],
    teacherEmail: 'emily.rodriguez@eduhelp.com'
  },
  {
    title: 'Environmental Science: Climate Change',
    description: 'Understanding climate change: causes, effects, and solutions. Learn about greenhouse gases, global warming, and environmental conservation.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dcULEDJGJBw',
    category: 'science',
    tags: ['environment', 'climate-change', 'conservation', 'sustainability'],
    teacherEmail: 'emily.rodriguez@eduhelp.com'
  },

  // Business & Marketing
  {
    title: 'Digital Marketing Strategy',
    description: 'Learn effective digital marketing strategies including SEO, social media marketing, content creation, and analytics to grow your online presence.',
    youtubeUrl: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    category: 'business',
    tags: ['marketing', 'digital', 'seo', 'social-media'],
    teacherEmail: 'david.wilson@eduhelp.com'
  },
  {
    title: 'Entrepreneurship Fundamentals',
    description: 'Essential guide to starting your own business. Learn about business planning, funding, market research, and scaling strategies.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZoqgAy3h4OM',
    category: 'business',
    tags: ['entrepreneurship', 'startup', 'business-plan', 'funding'],
    teacherEmail: 'david.wilson@eduhelp.com'
  },
  {
    title: 'Financial Literacy for Young Adults',
    description: 'Essential financial concepts including budgeting, investing, credit scores, and retirement planning for young professionals.',
    youtubeUrl: 'https://www.youtube.com/watch?v=gQK21572oSU',
    category: 'business',
    tags: ['finance', 'budgeting', 'investing', 'financial-planning'],
    teacherEmail: 'david.wilson@eduhelp.com'
  },

  // History & Social Studies
  {
    title: 'World History: The Industrial Revolution',
    description: 'Comprehensive overview of the Industrial Revolution, its causes, major innovations, and lasting impact on society and economics.',
    youtubeUrl: 'https://www.youtube.com/watch?v=zhL5DCizj5c',
    category: 'history',
    tags: ['history', 'industrial-revolution', 'society', 'economics'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  },
  {
    title: 'Ancient Civilizations: Rome and Greece',
    description: 'Explore the rise and fall of ancient Rome and Greece, their contributions to modern society, politics, and culture.',
    youtubeUrl: 'https://www.youtube.com/watch?v=46ZXl-V4qwY',
    category: 'history',
    tags: ['ancient-history', 'rome', 'greece', 'civilization'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  },
  {
    title: 'American History: Civil Rights Movement',
    description: 'In-depth study of the American Civil Rights Movement, key figures, major events, and their lasting impact on society.',
    youtubeUrl: 'https://www.youtube.com/watch?v=3GUEu_co8j4',
    category: 'history',
    tags: ['american-history', 'civil-rights', 'social-justice', 'activism'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  },

  // Creative & Arts
  {
    title: 'Digital Art and Design Principles',
    description: 'Learn fundamental design principles and digital art techniques using modern tools. Perfect for aspiring graphic designers and artists.',
    youtubeUrl: 'https://www.youtube.com/watch?v=YqQx75OPRa0',
    category: 'arts',
    tags: ['digital-art', 'design', 'graphics', 'creativity'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  },
  {
    title: 'Music Theory for Beginners',
    description: 'Introduction to music theory including scales, chords, rhythm, and composition. No prior musical experience required.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rgaTLrZGlk0',
    category: 'arts',
    tags: ['music', 'theory', 'composition', 'instruments'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  },

  // Language & Communication
  {
    title: 'Public Speaking and Presentation Skills',
    description: 'Master the art of public speaking with confidence-building techniques, speech structure, and audience engagement strategies.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Unzc731iCUY',
    category: 'communication',
    tags: ['public-speaking', 'presentation', 'communication', 'confidence'],
    teacherEmail: 'david.wilson@eduhelp.com'
  },
  {
    title: 'Creative Writing Workshop',
    description: 'Develop your creative writing skills through exercises in storytelling, character development, and narrative techniques.',
    youtubeUrl: 'https://www.youtube.com/watch?v=_kBwFPSa54w',
    category: 'language',
    tags: ['creative-writing', 'storytelling', 'literature', 'narrative'],
    teacherEmail: 'lisa.thompson@eduhelp.com'
  }
];

async function seedEnhancedLectures() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create teachers
    console.log('Creating teachers...');
    const createdTeachers = {};
    
    for (const teacherData of teachersData) {
      // Check if teacher already exists
      let teacher = await User.findOne({ email: teacherData.email });
      
      if (!teacher) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(teacherData.password, saltRounds);
        
        teacher = new User({
          name: teacherData.name,
          email: teacherData.email,
          password: hashedPassword,
          role: 'teacher',
          profile: teacherData.profile,
          badges: ['Expert Educator', 'Course Creator', 'Community Builder']
        });
        await teacher.save();
        console.log(`Created teacher: ${teacher.name}`);
      } else {
        console.log(`Teacher already exists: ${teacher.name}`);
      }
      
      createdTeachers[teacherData.email] = teacher;
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
    const lecturesWithTeachers = lectureData.map(lecture => {
      const videoId = extractVideoId(lecture.youtubeUrl);
      const teacher = createdTeachers[lecture.teacherEmail];
      
      if (!teacher) {
        console.error(`Teacher not found for email: ${lecture.teacherEmail}`);
        return null;
      }
      
      return {
        title: lecture.title,
        description: lecture.description,
        youtubeUrl: lecture.youtubeUrl,
        category: lecture.category,
        tags: lecture.tags,
        instructor: teacher._id,              // Required: ObjectId reference to teacher
        instructorName: teacher.name,         // Required: Teacher's name as string
        videoId: videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        stats: {
          views: Math.floor(Math.random() * 3000) + 100, // Random views between 100-3100
          likes: Math.floor(Math.random() * 200) + 10,   // Random likes between 10-210
          enrollments: Math.floor(Math.random() * 50) + 5  // Random enrollments between 5-55
        }
      };
    }).filter(lecture => lecture !== null);

    const createdLectures = await Lecture.insertMany(lecturesWithTeachers);
    console.log(`\\n✅ Created ${createdLectures.length} sample lectures`);

    // Group lectures by category for display
    const lecturesByCategory = {};
    createdLectures.forEach(lecture => {
      if (!lecturesByCategory[lecture.category]) {
        lecturesByCategory[lecture.category] = [];
      }
      lecturesByCategory[lecture.category].push(lecture);
    });

    console.log('\\n📚 Lectures by Category:');
    Object.keys(lecturesByCategory).forEach(category => {
      console.log(`\\n${category.toUpperCase()}:`);
      lecturesByCategory[category].forEach((lecture, index) => {
        console.log(`  ${index + 1}. ${lecture.title}`);
      });
    });

    console.log('\\n🎉 Enhanced lecture seeding completed successfully!');
    console.log('\\n🚀 Next steps:');
    console.log('1. Start your backend server: node server.js');
    console.log('2. Start your frontend: npm run dev');
    console.log('3. Visit /lectures to see all uploaded lectures');
    console.log('4. Login as a teacher to manage lectures');
    console.log('\\n👥 Sample teacher login credentials:');
    teachersData.forEach(teacher => {
      console.log(`   Email: ${teacher.email} | Password: ${teacher.password}`);
    });

  } catch (error) {
    console.error('❌ Error seeding lectures:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\\n🔌 Database connection closed');
  }
}

// Run the enhanced seeding function
seedEnhancedLectures();