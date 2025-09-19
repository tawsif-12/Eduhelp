import React, { useState, useEffect } from 'react';
import { Play, Eye, Star, Clock, User, Youtube, Search, Filter } from 'lucide-react';

export default function LecturesPage() {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockLectures = [
      {
        id: 1,
        title: 'Introduction to React Hooks',
        description: 'Learn the basics of React Hooks and how to use them effectively.',
        youtubeUrl: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        thumbnail: 'https://img.youtube.com/vi/O6P86uwfdR0/mqdefault.jpg',
        duration: '45 min',
        views: 1250,
        likes: 89,
        uploadDate: '2024-01-15',
        category: 'programming',
        tags: 'react, hooks, javascript',
        instructor: 'Prof. Smith',
        level: 'Beginner'
      },
      {
        id: 2,
        title: 'Advanced State Management',
        description: 'Deep dive into advanced state management patterns in React.',
        youtubeUrl: 'https://www.youtube.com/watch?v=35lXWvCuM8o',
        thumbnail: 'https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg',
        duration: '60 min',
        views: 980,
        likes: 67,
        uploadDate: '2024-01-10',
        category: 'programming',
        tags: 'react, state, redux',
        instructor: 'Dr. Johnson',
        level: 'Advanced'
      },
      {
        id: 3,
        title: 'JavaScript Fundamentals',
        description: 'Master the core concepts of JavaScript programming.',
        youtubeUrl: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
        thumbnail: 'https://img.youtube.com/vi/hdI2bqOjy3c/mqdefault.jpg',
        duration: '90 min',
        views: 2100,
        likes: 156,
        uploadDate: '2024-01-08',
        category: 'programming',
        tags: 'javascript, fundamentals, basics',
        instructor: 'Prof. Davis',
        level: 'Beginner'
      },
      {
        id: 4,
        title: 'Mathematics for Computer Science',
        description: 'Essential mathematical concepts for computer science students.',
        youtubeUrl: 'https://www.youtube.com/watch?v=2SpuBqvNjHI',
        thumbnail: 'https://img.youtube.com/vi/2SpuBqvNjHI/mqdefault.jpg',
        duration: '75 min',
        views: 850,
        likes: 43,
        uploadDate: '2024-01-05',
        category: 'mathematics',
        tags: 'math, algorithms, discrete',
        instructor: 'Dr. Wilson',
        level: 'Intermediate'
      }
    ];
    setLectures(mockLectures);
  }, []);

  const filteredLectures = lectures
    .filter(lecture => {
      const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecture.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecture.tags.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || lecture.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest':
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'popular':
          return b.views - a.views;
        case 'rating':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'business', label: 'Business' },
    { value: 'design', label: 'Design' }
  ];

  const handleWatchLecture = (youtubeUrl) => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Lectures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and watch educational content from expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lectures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredLectures.length} lecture{filteredLectures.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLectures.map((lecture) => (
            <div key={lecture.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/480x270/f3f4f6/9ca3af?text=Video+Thumbnail';
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{lecture.duration}</span>
                </div>
                <div className="absolute top-2 left-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    lecture.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    lecture.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lecture.level}
                  </span>
                </div>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center group">
                  <button
                    onClick={() => handleWatchLecture(lecture.youtubeUrl)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
                  >
                    <Play className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {lecture.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(lecture.uploadDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {lecture.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {lecture.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{lecture.instructor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{lecture.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{lecture.likes}</span>
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {lecture.tags.split(',').slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => handleWatchLecture(lecture.youtubeUrl)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLectures.length === 0 && (
          <div className="text-center py-12">
            <Youtube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No lectures found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}