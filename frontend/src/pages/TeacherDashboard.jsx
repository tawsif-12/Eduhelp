import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Video, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Settings, 
  Play, 
  Edit, 
  Trash2, 
  Plus, 
  Youtube, 
  FileText,
  Eye,
  Clock,
  Star,
  Download,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import lectureService from '../services/lectureService';
import LectureUploadForm from '../components/teacher/LectureUploadForm';
import LectureCard from '../components/teacher/LectureCard';

export default function TeacherDashboard() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch teacher's lectures on component mount
  useEffect(() => {
    if (user && user.id) {
      fetchTeacherLectures();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  const fetchTeacherLectures = async () => {
    try {
      setIsLoading(true);
      const teacherLectures = await lectureService.getLecturesByTeacher(user.id);
      setLectures(teacherLectures);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      setError('Failed to load lectures. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadLecture = async (lectureData) => {
    try {
      setError('');
      const lecturePayload = lectureService.prepareLectureData(lectureData, user.id);
      const newLecture = await lectureService.createLecture(lecturePayload);
      
      setLectures([newLecture, ...lectures]);
      setActiveTab('lectures'); // Switch to lectures tab after upload
    } catch (error) {
      console.error('Error uploading lecture:', error);
      setError(error.message || 'Failed to upload lecture. Please try again.');
    }
  };

  const handleDeleteLecture = async (id) => {
    try {
      await lectureService.deleteLecture(id);
      setLectures(lectures.filter(lecture => lecture._id !== id));
    } catch (error) {
      console.error('Error deleting lecture:', error);
      setError('Failed to delete lecture. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = {
    totalLectures: lectures.length,
    totalViews: lectures.reduce((sum, lecture) => sum + (lecture.stats?.views || lecture.views || 0), 0),
    totalLikes: lectures.reduce((sum, lecture) => sum + (lecture.stats?.likes || lecture.likes || 0), 0),
    studentsEnrolled: user?.studentsEnrolled || 0
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in as a teacher to view this dashboard</p>
          <Link to="/signin" className="text-emerald-600 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  // Role check
  if (user.role !== 'teacher') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">This dashboard is for teachers only</p>
          <Link to="/dashboard" className="text-blue-600 hover:underline">Go to Student Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-600 text-sm">{error}</div>
              <button 
                onClick={() => setError('')}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your lectures and engage with your students
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{stats.totalLectures}</div>
                    <div className="text-sm text-gray-600">Lectures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{stats.studentsEnrolled}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-xl font-bold text-emerald-600">{stats.totalLectures}</div>
            <div className="text-sm text-gray-600">Lectures</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-xl font-bold text-emerald-600">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Views</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton id="overview" label="Overview" icon={TrendingUp} />
          <TabButton id="lectures" label="My Lectures" icon={Video} />
          <TabButton id="upload" label="Upload Lecture" icon={Upload} />
          <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
          <TabButton id="students" label="Students" icon={Users} />
          <TabButton id="settings" label="Settings" icon={Settings} />
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Video className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">Total Lectures</span>
                    </div>
                    <span className="font-bold text-emerald-600">{stats.totalLectures}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">Total Views</span>
                    </div>
                    <span className="font-bold text-blue-600">{stats.totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <span className="text-gray-700">Total Likes</span>
                    </div>
                    <span className="font-bold text-yellow-600">{stats.totalLikes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-gray-700">Students Enrolled</span>
                    </div>
                    <span className="font-bold text-purple-600">{stats.studentsEnrolled}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-green-100 rounded-full">
                      <Upload className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">New lecture uploaded</p>
                      <p className="text-xs text-gray-500">Introduction to React Hooks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Lecture viewed 50 times</p>
                      <p className="text-xs text-gray-500">Advanced State Management</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-yellow-100 rounded-full">
                      <Star className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Received 15 new likes</p>
                      <p className="text-xs text-gray-500">React Hooks lecture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lectures Tab */}
          {activeTab === 'lectures' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">My Lectures</h3>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Lecture</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading lectures...</p>
                  </div>
                ) : lectures.map((lecture) => (
                  <LectureCard
                    key={lecture._id}
                    lecture={lecture}
                    onEdit={(lecture) => {
                      // TODO: Implement edit functionality
                      console.log('Edit lecture:', lecture);
                    }}
                    onDelete={handleDeleteLecture}
                  />
                ))}
              </div>

              {!isLoading && lectures.length === 0 && (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No lectures yet</h4>
                  <p className="text-gray-500 mb-4">Start by uploading your first lecture</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Upload Your First Lecture
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <LectureUploadForm onSubmit={handleUploadLecture} />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Analytics Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
                  <div className="text-sm text-blue-700">Total Views</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                  <Video className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-600">{stats.totalLectures}</div>
                  <div className="text-sm text-emerald-700">Total Lectures</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{stats.totalLikes}</div>
                  <div className="text-sm text-yellow-700">Total Likes</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{stats.studentsEnrolled}</div>
                  <div className="text-sm text-purple-700">Students</div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Student Management</h3>
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">Student management coming soon</h4>
                <p className="text-gray-500">Track student progress and engagement</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Profile Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Tell students about yourself..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://youtube.com/@yourchannel"
                  />
                </div>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}