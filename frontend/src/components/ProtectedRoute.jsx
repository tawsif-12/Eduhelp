import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, BookOpen } from 'lucide-react';

const ProtectedRoute = ({ children, redirectTo = "/signin", showAuthChoice = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated and showAuthChoice is true, show signin/signup choice
  if (!user && showAuthChoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
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
              Authentication Required
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in or create an account to access courses
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <Link 
              to="/signin" 
              state={{ from: location }}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </Link>
            
            <div className="text-center text-gray-500">or</div>
            
            <Link 
              to="/signup" 
              state={{ from: location }}
              className="w-full flex items-center justify-center px-4 py-3 border border-blue-300 text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to sign-in with return URL
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;