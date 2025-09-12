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
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Senior Full Stack Developer with 10+ years experience'
    },
    thumbnail: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
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
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Mathematics Professor with PhD from MIT'
    },
    thumbnail: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
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
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Digital Marketing Expert and Agency Owner'
    },
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
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
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Native Spanish Speaker and Language Teacher'
    },
    thumbnail: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
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
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Data Scientist at Tech Fortune 500 Company'
    },
    thumbnail: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
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
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Published Author and Creative Writing Coach'
    },
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    lessons: 24,
    certification: false,
    tags: ['Writing', 'Storytelling', 'Fiction'],
    featured: false
  }
];

export const categories = [
  { name: 'Technology', icon: '💻', count: 125 },
  { name: 'Mathematics', icon: '📊', count: 89 },
  { name: 'Science', icon: '🧪', count: 76 },
  { name: 'Languages', icon: '🌍', count: 94 },
  { name: 'Arts', icon: '🎨', count: 67 },
  { name: 'Business', icon: '💼', count: 112 },
  { name: 'Health', icon: '🏥', count: 45 },
  { name: 'Music', icon: '🎵', count: 38 }
];

export const successStories = [
  {
    id: 1,
    name: 'Jessica Martinez',
    story: 'Landed my dream job as a Software Developer after completing the Web Development course!',
    course: 'Introduction to Web Development',
    avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Software Developer at TechCorp'
  },
  {
    id: 2,
    name: 'Michael Brown',
    story: 'The Data Science course helped me transition from finance to tech seamlessly.',
    course: 'Introduction to Data Science',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Data Analyst at StartupXYZ'
  },
  {
    id: 3,
    name: 'Anna Thompson',
    story: 'Finally published my first novel thanks to the Creative Writing Workshop!',
    course: 'Creative Writing Workshop',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    position: 'Published Author'
  }
];

export const communityPosts = [
  {
    id: 1,
    title: 'Tips for Better Code Organization',
    author: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
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
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
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
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: 'Languages',
    replies: 31,
    likes: 267,
    timeAgo: '1 day ago',
    content: 'Staying motivated while learning a new language can be challenging...'
  }
];