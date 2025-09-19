import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LaravelAdminLayout from '../components/admin/LaravelAdminLayout';
import { 
  Users, BookOpen, TrendingUp, DollarSign, 
  Plus, Edit, Trash2, Search, Filter,
  BarChart3, PieChart, Calendar, Settings,
  Activity, Clock, CheckCircle, AlertTriangle,
  Eye, Download, RefreshCw, ArrowUp, ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivity: [],
    users: [],
    courses: []
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        stats: [
          { icon: Users, label: 'Total Users', value: '12,450', change: '+12%', changeType: 'increase', color: 'blue' },
          { icon: BookOpen, label: 'Total Courses', value: '156', change: '+5%', changeType: 'increase', color: 'green' },
          { icon: DollarSign, label: 'Revenue', value: '$89,240', change: '+18%', changeType: 'increase', color: 'yellow' },
          { icon: TrendingUp, label: 'Completion Rate', value: '87%', change: '+3%', changeType: 'increase', color: 'purple' }
        ],
        recentActivity: [
          { id: 1, action: 'New user registration', user: 'John Doe', time: '2 minutes ago', type: 'user' },
          { id: 2, action: 'Course completed', user: 'Sarah Wilson', time: '15 minutes ago', type: 'course' },
          { id: 3, action: 'Payment received', user: 'Mike Johnson', time: '1 hour ago', type: 'payment' },
          { id: 4, action: 'New course published', user: 'Dr. Smith', time: '2 hours ago', type: 'course' },
          { id: 5, action: 'User report submitted', user: 'Anonymous', time: '3 hours ago', type: 'report' }
        ],
        users: [
          { id: 1, name: 'John Smith', email: 'john@example.com', role: 'student', status: 'active', joinDate: '2025-01-15' },
          { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'teacher', status: 'active', joinDate: '2025-01-14' },
          { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', status: 'pending', joinDate: '2025-01-13' }
        ],
        courses: [
          { id: 1, title: 'React Development', instructor: 'Dr. Smith', students: 245, status: 'published', revenue: '$12,450' },
          { id: 2, title: 'Node.js Backend', instructor: 'Prof. Johnson', students: 189, status: 'published', revenue: '$9,870' },
          { id: 3, title: 'Laravel Mastery', instructor: 'Sarah Wilson', students: 156, status: 'draft', revenue: '$0' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-600" />;
      case 'course': return <BookOpen className="h-4 w-4 text-green-600" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-yellow-600" />;
      case 'report': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      published: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`;
  };

  if (loading) {
    return (
      <LaravelAdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </LaravelAdminLayout>
    );
  }

  return (
    <LaravelAdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="flex items-center space-x-1">
                {stat.changeType === 'increase' ? 
                  <ArrowUp className="h-4 w-4 text-green-600" /> : 
                  <ArrowDown className="h-4 w-4 text-red-600" />
                }
                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.user}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Course Completion</span>
                <span className="text-sm font-medium text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Satisfaction</span>
                <span className="text-sm font-medium text-gray-900">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Users className="h-4 w-4" />
                <span>Manage Users</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <BarChart3 className="h-4 w-4" />
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
              <Link to="/admin/users" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
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

        {/* Popular Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Popular Courses</h2>
              <Link to="/admin/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.students}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(course.status)}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LaravelAdminLayout>
  );
}