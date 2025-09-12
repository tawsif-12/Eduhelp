import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Award, TrendingUp, Clock, Star, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to view your dashboard</p>
          <Link to="/" className="text-blue-600 hover:underline">Go to homepage</Link>
        </div>
      </div>
    );
  }

  const enrolledCourses = mockCourses.slice(0, 3);
  const recentActivity = [
    { action: 'Completed lesson', course: 'Web Development', time: '2 hours ago' },
    { action: 'Started quiz', course: 'Data Science', time: '1 day ago' },
    { action: 'Earned badge', course: 'Mathematics', time: '3 days ago' },
    { action: 'Joined discussion', course: 'Spanish', time: '1 week ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'My Courses' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'activity', label: 'Activity' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: BookOpen, label: 'Courses Enrolled', value: user.coursesEnrolled, color: 'blue' },
            { icon: CheckCircle, label: 'Courses Completed', value: user.coursesCompleted, color: 'green' },
            { icon: Award, label: 'Badges Earned', value: user.badges.length, color: 'yellow' },
            { icon: TrendingUp, label: 'Learning Streak', value: '12 days', color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100 mb-4`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
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
              <div className="space-y-8">
                {/* Continue Learning */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledCourses.slice(0, 2).map(course => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">by {course.instructor.name}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">65% complete</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-gray-900">
                            <span className="font-medium">{activity.action}</span> in {activity.course}
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map(course => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{course.instructor.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500">65% complete</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow duration-200">
                      <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-900">{badge}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-medium">{activity.action}</span> in {activity.course}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}