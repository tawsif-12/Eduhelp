import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Users, Award, Play, BookOpen, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5003/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
        setLectures(data.lectures || []);
        
        // Set the first lecture as the current video if available
        if (data.lectures && data.lectures.length > 0) {
          setCurrentVideo(data.lectures[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleVideoSelect = (lecture) => {
    setCurrentVideo(lecture);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Course not found'}
          </h1>
          <Link to="/courses" className="text-blue-600 hover:underline inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const getYouTubeEmbedUrl = (youtubeUrl) => {
    const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

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
            <div className="bg-gray-800 rounded-2xl overflow-hidden aspect-video relative">
              {currentVideo ? (
                <iframe
                  src={getYouTubeEmbedUrl(currentVideo.youtubeUrl)}
                  title={currentVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">Course Preview</h3>
                    <p className="text-gray-300">Select a lecture to start watching</p>
                  </div>
                </div>
              )}
            </div>

            {/* Current Video Info */}
            {currentVideo && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo.title}</h2>
                <p className="text-gray-600 mb-4">{currentVideo.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentVideo.duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {currentVideo.stats?.views || 0} views
                  </span>
                </div>
              </div>
            )}

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
                        <div className="text-sm text-gray-600">Lectures</div>
                        <div className="font-semibold">{lectures.length}</div>
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

                    {course.tags && course.tags.length > 0 && (
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
                    )}
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Course Lectures</h3>
                    <div className="space-y-2">
                      {lectures.length > 0 ? (
                        lectures.map((lecture, index) => (
                          <div
                            key={lecture._id}
                            onClick={() => handleVideoSelect(lecture)}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                              currentVideo && currentVideo._id === lecture._id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                currentVideo && currentVideo._id === lecture._id
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-blue-100 text-blue-600'
                              }`}>
                                <Play className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{lecture.title}</h4>
                                <p className="text-sm text-gray-500">{lecture.description}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {lecture.duration}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No lectures available for this course yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.instructor.name}</h3>
                      <p className="text-gray-600 mb-4">{course.instructor.bio || 'Experienced educator and industry professional.'}</p>
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
                      <div className="text-4xl font-bold text-gray-900">{course.rating || 4.5}</div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= (course.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                          <div className="mb-2">
                            <div className="font-semibold text-gray-900">Student {review}</div>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
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
                      {lectures.length > 0 ? '0%' : 'Ready'} 
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                    <p className="text-gray-600 mt-2">0 of {lectures.length} lectures completed</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105">
                    Continue Learning
                  </button>
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
                  <span className="text-gray-600">Lectures</span>
                  <span className="font-medium">{lectures.length}</span>
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
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{course.instructor.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{course.instructor.bio || 'Experienced educator'}</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating || 4.5} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}