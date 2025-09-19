import React, { useState, useEffect } from 'react';
import LaravelAdminLayout from '../components/admin/LaravelAdminLayout';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, 
  Download, ChevronLeft, ChevronRight, 
  MoreVertical, BookOpen, Users, DollarSign,
  CheckCircle, XCircle, Clock, Play, Star
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  useEffect(() => {
    // Simulate loading courses data
    setTimeout(() => {
      setCourses([
        { 
          id: 1, 
          title: 'React Development Masterclass', 
          instructor: 'Dr. Sarah Smith', 
          category: 'Programming',
          status: 'published', 
          students: 245, 
          lectures: 24,
          duration: '12h 30m',
          price: '$99.99',
          rating: 4.8,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-15'
        },
        { 
          id: 2, 
          title: 'Node.js Backend Development', 
          instructor: 'Prof. Mike Johnson', 
          category: 'Programming',
          status: 'published', 
          students: 189, 
          lectures: 18,
          duration: '10h 45m',
          price: '$79.99',
          rating: 4.6,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-14'
        },
        { 
          id: 3, 
          title: 'Laravel Framework Mastery', 
          instructor: 'Sarah Wilson', 
          category: 'Programming',
          status: 'draft', 
          students: 0, 
          lectures: 20,
          duration: '15h 20m',
          price: '$129.99',
          rating: 0,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-13'
        },
        { 
          id: 4, 
          title: 'Digital Marketing Fundamentals', 
          instructor: 'Emma Davis', 
          category: 'Marketing',
          status: 'published', 
          students: 156, 
          lectures: 16,
          duration: '8h 15m',
          price: '$59.99',
          rating: 4.4,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-12'
        },
        { 
          id: 5, 
          title: 'Advanced Mathematics', 
          instructor: 'Dr. Robert Brown', 
          category: 'Mathematics',
          status: 'published', 
          students: 203, 
          lectures: 30,
          duration: '20h 10m',
          price: '$89.99',
          rating: 4.7,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-11'
        },
        { 
          id: 6, 
          title: 'Python for Data Science', 
          instructor: 'Lisa Chen', 
          category: 'Data Science',
          status: 'published', 
          students: 298, 
          lectures: 25,
          duration: '18h 30m',
          price: '$149.99',
          rating: 4.9,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-10'
        },
        { 
          id: 7, 
          title: 'Web Design with Figma', 
          instructor: 'Jennifer White', 
          category: 'Design',
          status: 'pending', 
          students: 0, 
          lectures: 12,
          duration: '6h 45m',
          price: '$49.99',
          rating: 0,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-09'
        },
        { 
          id: 8, 
          title: 'Machine Learning Basics', 
          instructor: 'David Martinez', 
          category: 'Data Science',
          status: 'published', 
          students: 167, 
          lectures: 22,
          duration: '14h 20m',
          price: '$119.99',
          rating: 4.5,
          thumbnail: '/api/placeholder/200/120',
          createdAt: '2025-01-08'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const categories = ['Programming', 'Design', 'Marketing', 'Data Science', 'Mathematics'];

  if (loading) {
    return (
      <LaravelAdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
            <h1 className="text-3xl font-bold text-gray-900">Courses Management</h1>
            <p className="text-gray-600 mt-1">Manage all courses in your platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>Add Course</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === 'published').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((sum, c) => sum + c.students, 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$45,230</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <div className="absolute top-2 right-2">
                <span className={getStatusBadge(course.status)}>
                  {course.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{course.category}</span>
                {course.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lectures:</span>
                  <span className="font-medium">{course.lectures}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">{course.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900" title="View">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <button className="text-gray-600 hover:text-gray-900" title="More options">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(startIndex + coursesPerPage, filteredCourses.length)}</span> of{' '}
                <span className="font-medium">{filteredCourses.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </LaravelAdminLayout>
  );
}