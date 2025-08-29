import React, { useState } from 'react';
import { Search, MessageCircle, Heart, Share, Plus, TrendingUp, Users, BookOpen } from 'lucide-react';
import { communityPosts } from '../../../Educaa/src/data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function Community() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'qa', label: 'Q&A', icon: BookOpen },
    { id: 'news', label: 'News & Tips', icon: TrendingUp }
  ];

  const categories = ['All', 'Technology', 'Mathematics', 'Science', 'Languages', 'Arts', 'Business'];

  const filteredPosts = communityPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-xl text-gray-600">Connect, learn, and grow together with fellow learners</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Users, label: 'Active Members', value: '12,450', color: 'blue' },
            { icon: MessageCircle, label: 'Discussions', value: '8,920', color: 'green' },
            { icon: BookOpen, label: 'Questions Answered', value: '15,670', color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-100 mb-4`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {user && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Start Discussion</span>
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:border-blue-300 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions, questions, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'discussions' && (
                  <div className="space-y-6">
                    {filteredPosts.map(post => (
                      <div key={post.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-start space-x-4">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                {post.title}
                              </h3>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {post.category}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">{post.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>by {post.author}</span>
                                <span>{post.timeAgo}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.replies}</span>
                                </button>
                                <button className="text-gray-500 hover:text-green-500 transition-colors duration-200">
                                  <Share className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Q&A Coming Soon</h3>
                      <p className="text-gray-600">Ask questions and get answers from the community</p>
                    </div>
                  </div>
                )}

                {activeTab === 'news' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">News & Tips Coming Soon</h3>
                      <p className="text-gray-600">Stay updated with the latest educational trends and tips</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}