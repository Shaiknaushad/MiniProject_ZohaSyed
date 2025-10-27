import React, { useState } from 'react';
import { User, Mail, Calendar, LogOut, Edit2, Save, X, Eye, Heart, Phone, Share2, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserActivity } from '../contexts/UserActivityContext';
import { formatPrice } from '../utils/formatters';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { stats, clearActivities } = useUserActivity();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'favorites'>('overview');
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    // Here you would typically update the user profile in Supabase
    // For now, we'll just simulate the save
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'viewed': return <Eye size={16} className="text-blue-600" />;
      case 'favorited': return <Heart size={16} className="text-red-600" />;
      case 'contacted': return <Phone size={16} className="text-green-600" />;
      case 'shared': return <Share2 size={16} className="text-purple-600" />;
      default: return <Eye size={16} className="text-gray-600" />;
    }
  };

  const getActivityText = (activityType: string) => {
    switch (activityType) {
      case 'viewed': return 'Viewed property';
      case 'favorited': return 'Added to favorites';
      case 'contacted': return 'Contacted agent';
      case 'shared': return 'Shared property';
      default: return 'Unknown activity';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3">
                  <User size={32} className="text-blue-900" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">
                    {user?.user_metadata?.full_name || 'User Profile'}
                  </h1>
                  <p className="text-blue-100">Manage your account information</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <LogOut size={20} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} className="mr-2" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save size={16} className="mr-2" />
                        )}
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-400 mr-3" />
                        <span className="text-gray-900">
                          {user?.user_metadata?.full_name || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail size={20} className="text-gray-400 mr-3" />
                      <span className="text-gray-900">{user?.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed from this page
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Calendar size={20} className="text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Statistics */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Activity Overview</h2>
                  {stats.totalActivities > 0 && (
                    <button
                      onClick={clearActivities}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{stats.propertiesViewed}</div>
                    <div className="text-sm text-blue-700">Properties Viewed</div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-900">{stats.propertiesFavorited}</div>
                    <div className="text-sm text-red-700">Favorites</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">{stats.agentsContacted}</div>
                    <div className="text-sm text-green-700">Agents Contacted</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">{stats.propertiesShared}</div>
                    <div className="text-sm text-purple-700">Properties Shared</div>
                  </div>
                </div>

                {/* Activity Tabs */}
                <div className="mt-8">
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-white text-blue-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('activities')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'activities'
                          ? 'bg-white text-blue-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Recent Activities
                    </button>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'favorites'
                          ? 'bg-white text-blue-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Favorites ({stats.favoriteProperties.length})
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
                    {activeTab === 'overview' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                        {stats.totalActivities === 0 ? (
                          <p className="text-gray-500 text-center py-8">
                            No activity yet. Start exploring properties to see your activity here!
                          </p>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Total Activities</span>
                              <span className="font-semibold text-gray-900">{stats.totalActivities}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Unique Properties Viewed</span>
                              <span className="font-semibold text-gray-900">{stats.viewedProperties.length}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <span className="text-gray-600">Properties in Favorites</span>
                              <span className="font-semibold text-gray-900">{stats.favoriteProperties.length}</span>
                            </div>
                            {stats.recentActivities.length > 0 && (
                              <div className="p-3 bg-white rounded-lg">
                                <span className="text-gray-600">Last Activity: </span>
                                <span className="font-semibold text-gray-900">
                                  {formatTimeAgo(stats.recentActivities[0].timestamp)}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'activities' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                        {stats.recentActivities.length === 0 ? (
                          <p className="text-gray-500 text-center py-8">No recent activities to display</p>
                        ) : (
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {stats.recentActivities.map((activity) => (
                              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                                <div className="flex-shrink-0 mt-1">
                                  {getActivityIcon(activity.activityType)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    {getActivityText(activity.activityType)}
                                  </p>
                                  <p className="text-sm text-gray-600 truncate">
                                    {activity.propertyTitle} - {activity.propertyLocation}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatPrice(activity.propertyPrice)}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 text-xs text-gray-500">
                                  {formatTimeAgo(activity.timestamp)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'favorites' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Properties</h3>
                        {stats.favoriteProperties.length === 0 ? (
                          <p className="text-gray-500 text-center py-8">
                            No favorite properties yet. Click the heart icon on properties to add them here!
                          </p>
                        ) : (
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {stats.recentActivities
                              .filter(activity => 
                                activity.activityType === 'favorited' && 
                                stats.favoriteProperties.includes(activity.propertyId)
                              )
                              .slice(0, 10)
                              .map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                                  <div className="flex-shrink-0 mt-1">
                                    <Heart size={16} className="text-red-600" fill="currentColor" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {activity.propertyTitle}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {activity.propertyLocation}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatPrice(activity.propertyPrice)}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0 text-xs text-gray-500">
                                    Added {formatTimeAgo(activity.timestamp)}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Account ID: {user?.id?.slice(0, 8)}...
              </div>
              <div className="flex space-x-4">
                <button className="text-sm text-blue-900 hover:text-blue-800 font-medium">
                  Change Password
                </button>
                <button className="text-sm text-red-600 hover:text-red-500 font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;