import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github, Mail as GoogleIcon, GraduationCap, BookOpen, Users, Award, TrendingUp, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    subject: '',
    experience: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    if (userType === 'teacher') {
      if (!formData.institution) newErrors.institution = 'Institution is required for teachers';
      if (!formData.subject) newErrors.subject = 'Subject area is required for teachers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await register(fullName, formData.email, formData.password, userType);
      
      // Redirect based on user type
      if (userType === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const studentFeatures = [
    { icon: GraduationCap, title: 'Access 1000+ Courses', description: 'Learn from expert instructors worldwide' },
    { icon: Award, title: 'Earn Certificates', description: 'Get recognized for your achievements' },
    { icon: Users, title: 'Join Community', description: 'Connect with fellow learners' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Monitor your learning journey' }
  ];

  const teacherFeatures = [
    { icon: BookOpen, title: 'Create Courses', description: 'Share your expertise with the world' },
    { icon: Globe, title: 'Global Reach', description: 'Teach students from anywhere' },
    { icon: TrendingUp, title: 'Analytics Dashboard', description: 'Track student engagement and progress' },
    { icon: Award, title: 'Monetize Skills', description: 'Earn from your teaching expertise' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join EduHelp Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your learning journey or share your knowledge with thousands of learners worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features and Benefits */}
          <div className="space-y-8">
            {/* User Type Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Path</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('student')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    userType === 'student'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <GraduationCap className="h-10 w-10 mx-auto mb-3" />
                  <h4 className="font-bold text-lg">Student</h4>
                  <p className="text-sm mt-2">Learn and grow your skills</p>
                </button>
                <button
                  onClick={() => setUserType('teacher')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    userType === 'teacher'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg scale-105'
                      : 'border-gray-300 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <BookOpen className="h-10 w-10 mx-auto mb-3" />
                  <h4 className="font-bold text-lg">Teacher</h4>
                  <p className="text-sm mt-2">Share your expertise</p>
                </button>
              </div>
            </div>

            {/* Features based on user type */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className={`text-2xl font-bold mb-6 ${
                userType === 'student' ? 'text-blue-800' : 'text-emerald-800'
              }`}>
                {userType === 'student' ? 'Student Benefits' : 'Teacher Benefits'}
              </h3>
              <div className="space-y-4">
                {(userType === 'student' ? studentFeatures : teacherFeatures).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      userType === 'student' ? 'bg-blue-100' : 'bg-emerald-100'
                    }`}>
                      <feature.icon className={`h-6 w-6 ${
                        userType === 'student' ? 'text-blue-600' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-800">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">1000+</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">4.9★</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${
                userType === 'student' ? 'text-blue-800' : 'text-emerald-800'
              }`}>
                Create Your {userType === 'student' ? 'Student' : 'Teacher'} Account
              </h2>
              <p className="text-gray-600 mt-2">
                Join thousands of {userType === 'student' ? 'learners' : 'educators'} on EduHelp
              </p>
            </div>

            {/* Social Sign Up */}
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
                <span className="px-2 bg-white text-gray-500">or sign up with email</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Teacher-specific fields */}
              {userType === 'teacher' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution/Organization *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.institution ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-emerald-500`}
                      placeholder="University/School/Company"
                    />
                    {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject/Area of Expertise *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-emerald-500`}
                    >
                      <option value="">Select your expertise</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="technology">Technology</option>
                      <option value="language">Language Arts</option>
                      <option value="business">Business</option>
                      <option value="arts">Arts & Design</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                </>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
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
                      placeholder="Minimum 8 characters"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      } ${userType === 'student' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500'}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`mt-1 h-4 w-4 rounded border-gray-300 ${
                    userType === 'student' ? 'text-blue-600 focus:ring-blue-500' : 'text-emerald-600 focus:ring-emerald-500'
                  }`}
                />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className={`${userType === 'student' ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'} underline`}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className={`${userType === 'student' ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'} underline`}>
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
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
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create My Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className={`font-medium ${
                    userType === 'student' ? 'text-blue-600 hover:text-blue-700' : 'text-emerald-600 hover:text-emerald-700'
                  } transition-colors duration-200`}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}