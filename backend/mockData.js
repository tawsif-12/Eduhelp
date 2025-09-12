export const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern web applications.',
    category: 'Technology',
    difficulty: 'Beginner',
    duration: '12 weeks',
    rating: 4.8,
    studentsEnrolled: 1250,
    price: 99,
    instructor: {
      name: 'Dr. Alex Chen',
      bio: 'Senior Full Stack Developer with 10+ years experience'
    },
    lessons: 45,
    certification: true,
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    featured: true
  },
  {
    id: '2',
    title: 'Advanced Mathematics: Calculus',
    description: 'Master differential and integral calculus with practical applications and real-world examples.',
    category: 'Mathematics',
    difficulty: 'Advanced',
    duration: '16 weeks',
    rating: 4.9,
    studentsEnrolled: 890,
    price: 149,
    instructor: {
      name: 'Prof. Maria Rodriguez',
      bio: 'Mathematics Professor with PhD from MIT'
    },
    lessons: 60,
    certification: true,
    tags: ['Calculus', 'Mathematics', 'Problem Solving'],
    featured: true
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn essential digital marketing strategies including SEO, social media, and content marketing.',
    category: 'Business',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    rating: 4.7,
    studentsEnrolled: 2100,
    price: 79,
    instructor: {
      name: 'Sarah Kim',
      bio: 'Digital Marketing Expert and Agency Owner'
    },
    lessons: 32,
    certification: true,
    tags: ['SEO', 'Social Media', 'Content Marketing'],
    featured: true
  },
  {
    id: '4',
    title: 'Spanish for Beginners',
    description: 'Start your Spanish journey with interactive lessons, pronunciation guides, and cultural insights.',
    category: 'Languages',
    difficulty: 'Beginner',
    duration: '10 weeks',
    rating: 4.6,
    studentsEnrolled: 1650,
    price: 69,
    instructor: {
      name: 'Carlos Mendoza',
      bio: 'Native Spanish Speaker and Language Teacher'
    },
    lessons: 40,
    certification: true,
    tags: ['Spanish', 'Conversation', 'Grammar'],
    featured: false
  },
  {
    id: '5',
    title: 'Introduction to Data Science',
    description: 'Explore data analysis, visualization, and machine learning using Python and popular libraries.',
    category: 'Technology',
    difficulty: 'Intermediate',
    duration: '14 weeks',
    rating: 4.8,
    studentsEnrolled: 980,
    price: 129,
    instructor: {
      name: 'Dr. Emily Zhang',
      bio: 'Data Scientist at Tech Fortune 500 Company'
    },
    lessons: 55,
    certification: true,
    tags: ['Python', 'Data Analysis', 'Machine Learning'],
    featured: true
  },
  {
    id: '6',
    title: 'Creative Writing Workshop',
    description: 'Develop your storytelling skills with guided exercises, peer reviews, and professional feedback.',
    category: 'Arts',
    difficulty: 'Beginner',
    duration: '6 weeks',
    rating: 4.5,
    studentsEnrolled: 720,
    price: 59,
    instructor: {
      name: 'James Patterson Jr.',
      bio: 'Published Author and Creative Writing Coach'
    },
    lessons: 24,
    certification: false,
    tags: ['Writing', 'Storytelling', 'Fiction'],
    featured: false
  }
];

export const categories = [
  { name: 'Technology', count: 125 },
  { name: 'Mathematics', count: 89 },
  { name: 'Science', count: 76 },
  { name: 'Languages', count: 94 },
  { name: 'Arts', count: 67 },
  { name: 'Business', count: 112 },
  { name: 'Health', count: 45 },
  { name: 'Music', count: 38 }
];

export const successStories = [
  {
    id: 1,
    name: 'Jessica Martinez',
    story: 'Landed my dream job as a Software Developer after completing the Web Development course!',
    course: 'Introduction to Web Development',
    position: 'Software Developer at TechCorp'
  },
  {
    id: 2,
    name: 'Michael Brown',
    story: 'The Data Science course helped me transition from finance to tech seamlessly.',
    course: 'Introduction to Data Science',
    position: 'Data Analyst at StartupXYZ'
  },
  {
    id: 3,
    name: 'Anna Thompson',
    story: 'Finally published my first novel thanks to the Creative Writing Workshop!',
    course: 'Creative Writing Workshop',
    position: 'Published Author'
  }
];

export const communityPosts = [
  {
    id: 1,
    title: 'Tips for Better Code Organization',
    author: 'Alex Chen',
    category: 'Technology',
    replies: 23,
    likes: 145,
    timeAgo: '2 hours ago',
    content: 'Here are some best practices I\'ve learned for organizing your code effectively...'
  },
  {
    id: 2,
    title: 'Understanding Complex Mathematical Concepts',
    author: 'Maria Rodriguez',
    category: 'Mathematics',
    replies: 18,
    likes: 89,
    timeAgo: '5 hours ago',
    content: 'Breaking down complex mathematical problems into smaller, manageable steps...'
  },
  {
    id: 3,
    title: 'Language Learning Motivation Techniques',
    author: 'Carlos Mendoza',
    category: 'Languages',
    replies: 31,
    likes: 267,
    timeAgo: '1 day ago',
    content: 'Staying motivated while learning a new language can be challenging...'
  }
];