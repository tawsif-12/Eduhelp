import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, BookOpen, TrendingUp, DollarSign, 
  Plus, Edit, Trash2, Search, Filter,
  BarChart3, PieChart, Calendar, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page</p>
          <Link to="/" className="text-blue-600 hover:underline">Go to homepage</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,450', change: '+12%', color: 'blue' },
    { icon: BookOpen, label: 'Total Courses', value: '156', change: '+5%', color: 'green' },
    { icon: DollarSign, label: 'Revenue', value: '$89,240', change: '+18%', color: 'yellow' },
    { icon: TrendingUp, label: 'Completion Rate', value: '87%', change: '+3%', color: 'purple' }
  ];

  const recentUsers = [
    { id: 1, name: 'Tawsif Bhai', email: 'tawsif@example.com', role: 'student', joinDate: '2025-01-15', status: 'active' },
    { id: 2, name: 'Irfan bhai', email: 'irfan@example.com', role: 'teacher', joinDate: '2025-01-14', status: 'active' },
    { id: 3, name: 'Dominic bhai', email: 'dominic@example.com', role: 'student', joinDate: '2025-01-13', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your educational platform</p>
        </div>

        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-4 rounded-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-3">
                      <Plus className="h-5 w-5" />
                      <span className="font-medium">Add New Course</span>
                    </button>
                    <button className="border-2 border-blue-300 text-blue-600 p-4 rounded-2xl hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-3">
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Manage Users</span>
                    </button>
                    <button className="border-2 border-purple-300 text-purple-600 p-4 rounded-2xl hover:bg-purple-50 transition-colors duration-200 flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-medium">View Analytics</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      'New user Sarah Wilson registered as teacher',
                      'Course "Advanced Mathematics" published',
                      'Payment received for Web Development course',
                      '5 new course reviews submitted'
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{activity}</span>
                        <span className="text-xs text-gray-500 ml-auto">{index + 1}h ago</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Course Management</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Course</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Students</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCourses.map(course => (
                        <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={course.thumbnail} alt={course.title} className="h-12 w-12 rounded-lg object-cover" />
                              <div>
                                <div className="font-semibold text-gray-900">{course.title}</div>
                                <div className="text-sm text-gray-600">by {course.instructor.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{course.category}</td>
                          <td className="py-4 px-4 text-gray-700">{course.studentsEnrolled}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-900 font-medium">{course.rating}</span>
                              <span className="text-yellow-400">★</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add User</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(userItem => (
                        <tr key={userItem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{userItem.name}</div>
                                <div className="text-sm text-gray-600">{userItem.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                              userItem.role === 'teacher' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {userItem.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{userItem.joinDate}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              userItem.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {userItem.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 transition-colors duration-200">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
                
                {/* Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-100 rounded-2xl p-8 text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Course Enrollment Trends</h3>
                    <p className="text-gray-500">Interactive charts coming soon</p>
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-8 text-center">
                    <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">User Demographics</h3>
                    <p className="text-gray-500">Detailed analytics coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {['courses', 'users', 'settings'].includes(activeTab) && activeTab !== 'analytics' && (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === 'courses' ? 'Course Management' : 
                   activeTab === 'users' ? 'User Management' : 'Settings'}
                </h3>
                <p className="text-gray-600">Advanced management features coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}