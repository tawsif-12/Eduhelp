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
          <Link to="/courses" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const lessons = [
    { id: 1, title: 'Introduction to the Course', duration: '10 min', completed: true, type: 'video' },
    { id: 2, title: 'Setting Up Your Development Environment', duration: '15 min', completed: true, type: 'video' },
    { id: 3, title: 'Your First HTML Page', duration: '20 min', completed: false, type: 'video' },
    { id: 4, title: 'CSS Fundamentals', duration: '25 min', completed: false, type: 'video' },
    { id: 5, title: 'Practice Exercise: Build a Portfolio', duration: '30 min', completed: false, type: 'assignment' },
    { id: 6, title: 'JavaScript Basics', duration: '35 min', completed: false, type: 'video' },
    { id: 7, title: 'Interactive Elements', duration: '20 min', completed: false, type: 'video' },
    { id: 8, title: 'Quiz: HTML & CSS Knowledge Check', duration: '15 min', completed: false, type: 'quiz' }
  ];

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
            <li><Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link to="/courses" className="text-gray-500 hover:text-blue-600">Courses</Link></li>
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
                  <Play className="h-12 w-12 text-white ml-1" />
                </button>
              </div>
            </div>

            {/* Course Info Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-semibold">{course.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">Lessons</div>
                        <div className="font-semibold">{course.lessons}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">Students</div>
                        <div className="font-semibold">{course.studentsEnrolled}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">Certificate</div>
                        <div className="font-semibold">{course.certification ? 'Yes' : 'No'}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.tags.map((tag, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Course Curriculum</h3>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                            lesson.completed
                              ? 'border-green-200 bg-green-50'
                              : user
                              ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          onClick={() => user && setCurrentLesson(index)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              lesson.completed
                                ? 'bg-green-500 text-white'
                                : user
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-300 text-gray-500'
                            }`}>
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : lesson.type === 'video' ? (
                                <Play className="h-4 w-4" />
                              ) : lesson.type === 'quiz' ? (
                                '?'
                              ) : (
                                <BookOpen className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <p className="text-sm text-gray-500">{lesson.duration}</p>
                            </div>
                          </div>
                          {!user && (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-gray-600">{course.instructor.bio}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">About the Instructor</h4>
                      <p className="text-gray-700">
                        {course.instructor.name} is a passionate educator with years of experience in the field. 
                        They bring real-world expertise and a commitment to student success to every course.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{course.studentsEnrolled} reviews</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map(review => (
                        <div key={review} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <img
                              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                              alt="Reviewer"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold text-gray-900">Student {review}</div>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            This course exceeded my expectations. The instructor explains complex concepts clearly and provides practical examples.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {user ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {progressPercentage}% Complete
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 mt-2">{completedLessons} of {lessons.length} lessons completed</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105">
                    Continue Learning
                  </button>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <Download className="h-4 w-4" />
                      <span>Resources</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <Award className="h-4 w-4" />
                      <span>Certificate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">${course.price}</div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105">
                    Enroll Now
                  </button>
                  <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                </div>
              )}
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.studentsEnrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-medium">{course.certification ? 'Included' : 'Not included'}</span>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Instructor</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{course.instructor.name}</h4>
                  <p className="text-gray-600 text-sm">{course.instructor.bio}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{course.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}