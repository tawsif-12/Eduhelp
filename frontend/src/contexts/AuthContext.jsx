import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { isTokenExpired } from '../utils/jwtUtils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('educa-user');
    const token = authService.getToken();
    // If we have a saved user but no token or expired token, clear the user data
    if (savedUser && (!token || isTokenExpired(token))) {
      localStorage.removeItem('educa-user');
      authService.removeToken();
      setUser(null);
    } else if (savedUser && token && !isTokenExpired(token)) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Redirect teacher to dashboard if not already there
      if (parsedUser.role === 'teacher' && window.location.pathname !== '/teacher-dashboard') {
        navigate('/teacher-dashboard');
      }
    }
    setIsLoading(false);
  }, [navigate]);

  const login = async (email, password, userType = 'student') => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      // Handle the response structure with token and user
      const userData = response.user || response;
      const formattedUser = authService.formatUserData(userData);
      setUser(formattedUser);
      localStorage.setItem('educa-user', JSON.stringify(formattedUser));
      setIsLoading(false);
      // Redirect admin or teacher to dashboard
      if (formattedUser.role === 'admin') {
        navigate('/admin');
      } else if (formattedUser.role === 'teacher') {
        navigate('/teacher-dashboard');
      }
      return formattedUser;
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('educa-user');
    authService.logout(); // This will remove the JWT token
  };

  const register = async (formData, userType) => {
    setIsLoading(true);
    try {
      const registrationData = authService.prepareRegistrationData(formData, userType);
      const response = await authService.register(registrationData);
      
      // Handle the response structure with token and user
      const userData = response.user || response;
      const formattedUser = authService.formatUserData(userData);
      
      setUser(formattedUser);
      localStorage.setItem('educa-user', JSON.stringify(formattedUser));
      setIsLoading(false);
      // Redirect admin or teacher to dashboard
      if (formattedUser.role === 'admin') {
        navigate('/admin');
      } else if (formattedUser.role === 'teacher') {
        navigate('/teacher-dashboard');
      }
      return formattedUser;
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message || 'Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}