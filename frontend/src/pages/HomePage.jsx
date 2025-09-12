import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, Award, BookOpen, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { mockCourses, categories, successStories } from '../data/mockData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredCourses = mockCourses.filter(course => course.featured);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 via-violet-700 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Learning Made
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of courses, connect with expert instructors, and advance your skills with our cutting-edge educational platform.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 shadow-lg"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/courses"
                className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Learning Today
              </Link>
              <Link
                to="/courses"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-violet-600 transition-all duration-200 transform hover:scale-105"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Students', value: '50,000+' },
              { icon: BookOpen, label: 'Courses', value: '500+' },
              { icon: Award, label: 'Certificates', value: '25,000+' },
              { icon: TrendingUp, label: 'Success Rate', value: '94%' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-green-100 to-orange-100 p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular and highly-rated courses taught by industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentsEnrolled}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">{course.instructor.name}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${course.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-green-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">
              Find the perfect course in your area of interest
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/courses?category=${category.name}`}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.count} courses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-r from-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              See how our students are achieving their goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map(story => (
              <div key={story.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-violet-600 font-medium">{story.position}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{story.story}"
                </blockquote>
                <div className="text-sm text-gray-500">
                  Course: {story.course}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-violet-100 mb-8">
            Join thousands of learners who are already advancing their careers with Educa
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/courses"
              className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Explore Courses
            </Link>
            <Link
              to="/community"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-violet-600 transition-all duration-200 transform hover:scale-105"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
