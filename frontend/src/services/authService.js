const API_BASE_URL = 'http://localhost:5003/api';

class AuthService {
  // Store JWT token in localStorage
  setToken(token) {
    localStorage.setItem('authToken', token);
  }

  // Get JWT token from localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Remove JWT token from localStorage
  removeToken() {
    localStorage.removeItem('authToken');
  }

  // Get Authorization header with token
  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store the JWT token
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Network error during registration');
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store the JWT token
      if (data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Network error during login');
    }
  }

  async logout() {
    this.removeToken();
  }

  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user data');
      }

      return data;
    } catch (error) {
      console.error('Get user error:', error);
      throw new Error(error.message || 'Network error while fetching user');
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      return data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Network error during profile update');
    }
  }

  // Helper function to format user data for frontend compatibility
  formatUserData(backendUser) {
    return {
      id: backendUser._id,
      name: backendUser.name,
      email: backendUser.email,
      role: backendUser.role,
      joinedDate: backendUser.createdAt ? new Date(backendUser.createdAt).toISOString().split('T')[0] : null,
      profile: backendUser.profile || {},
      stats: backendUser.stats || {},
      badges: backendUser.badges || [],
      // For backward compatibility with existing frontend
      coursesEnrolled: backendUser.stats?.coursesEnrolled || 0,
      coursesCompleted: backendUser.stats?.coursesCompleted || 0,
      coursesCreated: backendUser.stats?.coursesCreated || 0,
      studentsEnrolled: backendUser.stats?.studentsEnrolled || 0,
    };
  }

  // Helper function to prepare registration data for backend
  prepareRegistrationData(formData, userType) {
    const baseData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: userType,
    };

    // Add profile data based on user type
    if (userType === 'teacher') {
      baseData.profile = {
        institution: formData.institution,
        subject: formData.subject,
        experience: formData.experience,
      };
    } else {
      baseData.profile = {
        institution: formData.institution || '',
        grade: formData.grade || '',
        interests: formData.interests || [],
      };
    }

    return baseData;
  }
}

const authService = new AuthService();
export default authService;