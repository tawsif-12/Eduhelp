const API_BASE_URL = 'http://localhost:5003/api';

class LectureService {
  // Get JWT token from localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Get Authorization header with token
  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async createLecture(lectureData) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(lectureData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create lecture');
      }

      return data;
    } catch (error) {
      console.error('Create lecture error:', error);
      throw new Error(error.message || 'Network error during lecture creation');
    }
  }

  async getAllLectures(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.teacher) queryParams.append('teacher', filters.teacher);
      if (filters.search) queryParams.append('search', filters.search);

      const url = `${API_BASE_URL}/lectures${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch lectures');
      }

      return data;
    } catch (error) {
      console.error('Get lectures error:', error);
      throw new Error(error.message || 'Network error while fetching lectures');
    }
  }

  async getLecturesByTeacher(teacherId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/instructor/${teacherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch teacher lectures');
      }

      return data;
    } catch (error) {
      console.error('Get teacher lectures error:', error);
      throw new Error(error.message || 'Network error while fetching teacher lectures');
    }
  }

  async getLectureById(lectureId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch lecture');
      }

      return data;
    } catch (error) {
      console.error('Get lecture error:', error);
      throw new Error(error.message || 'Network error while fetching lecture');
    }
  }

  async updateLecture(lectureId, lectureData) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
        body: JSON.stringify(lectureData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update lecture');
      }

      return data;
    } catch (error) {
      console.error('Update lecture error:', error);
      throw new Error(error.message || 'Network error during lecture update');
    }
  }

  async deleteLecture(lectureId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete lecture');
      }

      return data;
    } catch (error) {
      console.error('Delete lecture error:', error);
      throw new Error(error.message || 'Network error during lecture deletion');
    }
  }

  async likeLecture(lectureId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to like lecture');
      }

      return data;
    } catch (error) {
      console.error('Like lecture error:', error);
      throw new Error(error.message || 'Network error while liking lecture');
    }
  }

  async getPopularLectures() {
    try {
      const response = await fetch(`${API_BASE_URL}/lectures/popular/top`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch popular lectures');
      }

      return data;
    } catch (error) {
      console.error('Get popular lectures error:', error);
      throw new Error(error.message || 'Network error while fetching popular lectures');
    }
  }

  // Helper function to validate YouTube URL
  validateYouTubeUrl(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  }

  // Helper function to extract video ID from YouTube URL
  extractVideoId(url) {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  }

  // Helper function to generate thumbnail URL
  generateThumbnailUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  // Helper function to prepare lecture data for API
  prepareLectureData(formData, teacherId) {
    return {
      title: formData.title,
      description: formData.description,
      youtubeUrl: formData.youtubeUrl,
      category: formData.category,
      instructor: teacherId,
      tags: formData.tags || [],
      thumbnail: formData.customThumbnail || undefined, // Let backend generate if not provided
    };
  }
}

const lectureService = new LectureService();
export default lectureService;