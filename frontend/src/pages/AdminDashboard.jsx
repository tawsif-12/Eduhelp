import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, BookOpen, TrendingUp, DollarSign, 
  Plus, Edit, Trash2, Search, Filter,
  BarChart3, PieChart, Calendar, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function AdminDashboard() {
  const { user } = useAuth();

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

  // Removed tabs and navigation for admin dashboard

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,450', change: '+12%', color: 'blue' },
    { icon: BookOpen, label: 'Total Courses', value: '156', change: '+5%', color: 'green' },
    { icon: DollarSign, label: 'Revenue', value: '$89,240', change: '+18%', color: 'yellow' },
    { icon: TrendingUp, label: 'Completion Rate', value: '87%', change: '+3%', color: 'purple' }
  ];

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'student', joinDate: '2025-01-15', status: 'active' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'teacher', joinDate: '2025-01-14', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', joinDate: '2025-01-13', status: 'pending' },
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
    </div>
  );
}