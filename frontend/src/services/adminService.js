import axios from 'axios';

const API_URL = 'http://localhost:5003/api/admin';

// Get auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('authToken'); // Fixed: was 'token', now 'authToken'
  return token ? `Bearer ${token}` : '';
};

// Configure axios defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Dashboard Statistics
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
  }
};

// User Management
export const getUsers = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.role && params.role !== 'all') queryParams.append('role', params.role);
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    
    const response = await api.get(`/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user' };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};

// Course Management
export const getCourses = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.category && params.category !== 'all') queryParams.append('category', params.category);
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    
    const response = await api.get(`/courses?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch courses' };
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/courses', courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create course' };
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update course' };
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete course' };
  }
};

// Lecture Management
export const getLectures = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.courseId) queryParams.append('courseId', params.courseId);
    
    const response = await api.get(`/lectures?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch lectures' };
  }
};

export const createLecture = async (lectureData) => {
  try {
    const response = await api.post('/lectures', lectureData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create lecture' };
  }
};

export const updateLecture = async (id, lectureData) => {
  try {
    const response = await api.put(`/lectures/${id}`, lectureData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update lecture' };
  }
};

export const deleteLecture = async (id) => {
  try {
    const response = await api.delete(`/lectures/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete lecture' };
  }
};

// Success Stories Management
export const getSuccessStories = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const response = await api.get(`/success-stories?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch success stories' };
  }
};

// Analytics
export const getAnalytics = async () => {
  try {
    const response = await api.get('/analytics/overview');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch analytics' };
  }
};

export default {
  getDashboardStats,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getLectures,
  createLecture,
  updateLecture,
  deleteLecture,
  getSuccessStories,
  getAnalytics,
};