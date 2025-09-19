import React, { useState } from 'react';
import { Upload, Youtube, X } from 'lucide-react';

export default function LectureUploadForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});

  const extractYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube URL is required';
    } else if (!extractYouTubeVideoId(formData.youtubeUrl)) {
      newErrors.youtubeUrl = 'Please enter a valid YouTube URL';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const videoId = extractYouTubeVideoId(formData.youtubeUrl);
    const lectureData = {
      ...formData,
      videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    };

    onSubmit(lectureData);
    setFormData({
      title: '',
      description: '',
      youtubeUrl: '',
      category: '',
      tags: ''
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Upload New Lecture</h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lecture Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter lecture title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="programming">Programming</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
              <option value="language">Language</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL *
          </label>
          <div className="relative">
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                errors.youtubeUrl ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://youtube.com/watch?v=..."
            />
            <Youtube className="absolute left-3 top-2.5 h-5 w-5 text-red-600" />
          </div>
          {errors.youtubeUrl && <p className="text-red-500 text-xs mt-1">{errors.youtubeUrl}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Paste the full YouTube URL of your lecture video
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Describe what students will learn in this lecture..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="react, javascript, programming (comma separated)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add tags separated by commas to help students find your content
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Lecture</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                youtubeUrl: '',
                category: '',
                tags: ''
              });
              setErrors({});
            }}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}