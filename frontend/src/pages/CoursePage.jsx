import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Users, Award, Play, BookOpen, Download, CheckCircle, Lock } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function CoursePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(0);
  
  const course = mockCourses.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
          <Link to="/courses" className="text-violet-600 hover:underline mt-4 inline-block">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  // Use course.lessons if available, otherwise fallback to default lessons
  const defaultLessons = [
    { id: 1, title: 'Introduction to the Course', duration: '10 min', completed: true, type: 'video' },
    { id: 2, title: 'Setting Up Your Development Environment', duration: '15 min', completed: true, type: 'video' },
    { id: 3, title: 'Your First HTML Page', duration: '20 min', completed: false, type: 'video' },
    { id: 4, title: 'CSS Fundamentals', duration: '25 min', completed: false, type: 'video' },
    { id: 5, title: 'Practice Exercise: Build a Portfolio', duration: '30 min', completed: false, type: 'assignment' },
    { id: 6, title: 'JavaScript Basics', duration: '35 min', completed: false, type: 'video' },
    { id: 7, title: 'Interactive Elements', duration: '20 min', completed: false, type: 'video' },
    { id: 8, title: 'Quiz: HTML & CSS Knowledge Check', duration: '15 min', completed: false, type: 'quiz' }
  ];
  const lessons = course.lessons || defaultLessons;

  const completedLessons = lessons.filter(l => l.completed).length;
  const progressPercentage = Math.round((completedLessons / lessons.length) * 100);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li><Link to="/" className="text-gray-500 hover:text-violet-600">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/courses" className="text-gray-500 hover:text-violet-600">Courses</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><span className="text-gray-900">{course.title}</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden aspect-video relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-200 transform hover:scale-110">
                  <Play className="h-8 w-8 text-white" />
                </button>
              </div>
            </div>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8" aria-label="Tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Course Curriculum</h3>
                  <div className="space-y-2">
                    {lessons.map(lesson => (
                      <div key={lesson.id} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${lesson.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div>
                          <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : lesson.type === 'video' ? (
                            <Play className="h-5 w-5 text-gray-400" />
                          ) : lesson.type === 'assignment' ? (
                            <BookOpen className="h-5 w-5 text-orange-500" />
                          ) : lesson.type === 'quiz' ? (
                            <Award className="h-5 w-5 text-yellow-500" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* ...existing code for sidebar... */}
        </div>
      </div>
    </div>
  );
}
