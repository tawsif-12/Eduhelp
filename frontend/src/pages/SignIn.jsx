import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github, Mail as GoogleIcon, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password, userType);
      
      // Redirect based on user type
      if (userType === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              EduHelp
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Sign in as:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('student')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  userType === 'student'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <GraduationCap className="h-6 w-6 mb-2" />
                <span className="font-medium">Student</span>
              </button>
              <button
                onClick={() => setUserType('teacher')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  userType === 'teacher'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-300 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="font-medium">Teacher</span>
              </button>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className={`w-full flex items-center justify-center space-x-3 border-2 py-3 px-4 rounded-lg transition-all duration-200 ${
              userType === 'student' 
                ? 'border-blue-300 text-blue-700 hover:bg-blue-50' 
                : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
            }`}>
              <GoogleIcon className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              <Github className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
                placeholder={`Enter your ${userType} email`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
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
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 rounded border-gray-300 ${
                    userType === 'student' ? 'text-blue-600 focus:ring-blue-500' : 'text-emerald-600 focus:ring-emerald-500'
                  }`}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className={`font-medium ${
                    userType === 'student' ? 'text-blue-600 hover:text-blue-500' : 'text-emerald-600 hover:text-emerald-500'
                  }`}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                userType === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
              }`}
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In as {userType === 'student' ? 'Student' : 'Teacher'}</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className={`font-medium ${
                  userType === 'student' ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'
                } transition-colors duration-200`}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}