import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit3, Award, BookOpen, Calendar, Save, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate learner exploring new technologies and concepts.'
  });

  // Redirect admin users to admin dashboard and teachers to teacher dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    } else if (user && user.role === 'teacher') {
      navigate('/teacher-dashboard');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <Link to="/" className="text-blue-600 hover:underline">Go to homepage</Link>
        </div>
      </div>
    );
  }

  // If user is admin or teacher, don't render the profile page (will redirect)
  if (user.role === 'admin' || user.role === 'teacher') {
    return null;
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      bio: 'Passionate learner exploring new technologies and concepts.'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100 capitalize">{user.role}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined {user.joinedDate}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <p className="text-gray-900">Passionate learner exploring new technologies and concepts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <p className="text-gray-900 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">{user.coursesEnrolled}</div>
            <div className="text-gray-600">Courses Enrolled</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">{user.coursesCompleted}</div>
            <div className="text-gray-600">Courses Completed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">{user.badges.length}</div>
            <div className="text-gray-600">Badges Earned</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.badges.map((badge, index) => (
              <div key={index} className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900">{badge}</h3>
                <p className="text-sm text-gray-600 mt-2">Earned for outstanding achievement</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}