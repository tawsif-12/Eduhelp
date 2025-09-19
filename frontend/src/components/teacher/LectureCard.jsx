import React from 'react';
import { Play, Edit, Trash2, Eye, Star, Youtube } from 'lucide-react';

export default function LectureCard({ lecture, onEdit, onDelete }) {
  const handleWatch = () => {
    window.open(lecture.youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={lecture.thumbnail}
          alt={lecture.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/480x270/f3f4f6/9ca3af?text=Video+Thumbnail';
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {lecture.duration || 'N/A'}
        </div>
        <div className="absolute top-2 left-2">
          <Youtube className="h-6 w-6 text-red-600" />
        </div>
        {lecture.status && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            lecture.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {lecture.status}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-2 line-clamp-2" title={lecture.title}>
          {lecture.title}
        </h4>
        
        {lecture.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={lecture.description}>
            {lecture.description}
          </p>
        )}

        {/* Category */}
        {lecture.category && (
          <div className="mb-3">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
              {lecture.category}
            </span>
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{lecture.views || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{lecture.likes || 0}</span>
            </span>
          </div>
          {lecture.uploadDate && (
            <span>{new Date(lecture.uploadDate).toLocaleDateString()}</span>
          )}
        </div>

        {/* Tags */}
        {lecture.tags && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {lecture.tags.split(',').slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {tag.trim()}
                </span>
              ))}
              {lecture.tags.split(',').length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{lecture.tags.split(',').length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleWatch}
            className="flex-1 bg-red-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <Play className="h-4 w-4" />
            <span>Watch</span>
          </button>
          
          {onEdit && (
            <button
              onClick={() => onEdit(lecture)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Edit lecture"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this lecture?')) {
                  onDelete(lecture.id);
                }
              }}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete lecture"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}