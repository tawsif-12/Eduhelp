import React, { useState } from 'react';
import { X, Eye, EyeOff, Github, Mail as GoogleIcon, Users, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password, userType);
      } else {
        await register(formData.name, formData.email, formData.password, userType);
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      role: type
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back to EduHelp' : 'Join EduHelp'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Type Selection */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            {isLogin ? 'Sign in as:' : 'Join as:'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleUserTypeChange('student')}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                userType === 'student'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <GraduationCap className="h-8 w-8 mb-2" />
              <span className="font-medium">Student</span>
              <span className="text-sm text-gray-600 text-center mt-1">
                Learn and explore courses
              </span>
            </button>
            <button
              onClick={() => handleUserTypeChange('teacher')}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                userType === 'teacher'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <BookOpen className="h-8 w-8 mb-2" />
              <span className="font-medium">Teacher</span>
              <span className="text-sm text-gray-600 text-center mt-1">
                Create and teach courses
              </span>
            </button>
          </div>
        </div>

        {/* Social Login */}
        <div className="p-6 border-b">
          <div className="space-y-3">
            <button className={`w-full flex items-center justify-center space-x-3 border-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              userType === 'student' 
                ? 'border-blue-300 text-blue-700 hover:bg-blue-50' 
                : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
            }`}>
              <GoogleIcon className="h-5 w-5" />
              <span>Continue with Google as {userType === 'student' ? 'Student' : 'Teacher'}</span>
            </button>
            <button className={`w-full flex items-center justify-center space-x-3 border-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              userType === 'student' 
                ? 'border-gray-300 hover:border-blue-300 hover:bg-blue-50' 
                : 'border-gray-300 hover:border-emerald-300 hover:bg-emerald-50'
            }`}>
              <Github className="h-5 w-5" />
              <span>Continue with GitHub as {userType === 'student' ? 'Student' : 'Teacher'}</span>
            </button>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'
                }`}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'
              }`}
              placeholder={`Enter your ${userType} email`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'
                }`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {!isLogin && userType === 'teacher' && (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2">Teacher Benefits:</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Create and manage your own courses</li>
                <li>• Access to advanced analytics</li>
                <li>• Direct communication with students</li>
                <li>• Monetize your expertise</li>
              </ul>
            </div>
          )}

          {!isLogin && userType === 'student' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Student Benefits:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Access to thousands of courses</li>
                <li>• Progress tracking and certificates</li>
                <li>• Interactive learning experience</li>
                <li>• Community support and discussions</li>
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed ${
              userType === 'student'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
            }`}
          >
            {isLoading ? 'Please wait...' : (isLogin ? `Sign In as ${userType === 'student' ? 'Student' : 'Teacher'}` : `Create ${userType === 'student' ? 'Student' : 'Teacher'} Account`)}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={`text-sm transition-colors duration-200 ${
                userType === 'student'
                  ? 'text-blue-600 hover:text-blue-700'
                  : 'text-emerald-600 hover:text-emerald-700'
              }`}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}