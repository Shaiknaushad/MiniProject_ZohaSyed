import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface PropertyActivity {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: number;
  activityType: 'viewed' | 'favorited' | 'contacted' | 'shared';
  timestamp: string;
}

export interface UserActivityStats {
  propertiesViewed: number;
  propertiesFavorited: number;
  agentsContacted: number;
  propertiesShared: number;
  totalActivities: number;
  recentActivities: PropertyActivity[];
  favoriteProperties: string[];
  viewedProperties: string[];
}

interface UserActivityContextType {
  stats: UserActivityStats;
  addActivity: (activity: Omit<PropertyActivity, 'id' | 'timestamp'>) => void;
  toggleFavorite: (propertyId: string, propertyTitle: string, propertyLocation: string, propertyPrice: number) => void;
  isFavorited: (propertyId: string) => boolean;
  clearActivities: () => void;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (context === undefined) {
    throw new Error('useUserActivity must be used within a UserActivityProvider');
  }
  return context;
};

export const UserActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserActivityStats>({
    propertiesViewed: 0,
    propertiesFavorited: 0,
    agentsContacted: 0,
    propertiesShared: 0,
    totalActivities: 0,
    recentActivities: [],
    favoriteProperties: [],
    viewedProperties: []
  });

  // Load activities from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedStats = localStorage.getItem(`userActivity_${user.id}`);
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          setStats(parsedStats);
        } catch (error) {
          console.error('Error loading user activities:', error);
        }
      }
    } else {
      // Reset stats when user logs out
      setStats({
        propertiesViewed: 0,
        propertiesFavorited: 0,
        agentsContacted: 0,
        propertiesShared: 0,
        totalActivities: 0,
        recentActivities: [],
        favoriteProperties: [],
        viewedProperties: []
      });
    }
  }, [user]);

  // Save activities to localStorage whenever stats change
  useEffect(() => {
    if (user && stats.totalActivities > 0) {
      localStorage.setItem(`userActivity_${user.id}`, JSON.stringify(stats));
    }
  }, [stats, user]);

  const addActivity = (activity: Omit<PropertyActivity, 'id' | 'timestamp'>) => {
    if (!user) return;

    const newActivity: PropertyActivity = {
      ...activity,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };

    setStats(prevStats => {
      const updatedStats = { ...prevStats };
      
      // Add to recent activities (keep last 20)
      updatedStats.recentActivities = [newActivity, ...prevStats.recentActivities].slice(0, 20);
      
      // Update counters based on activity type
      switch (activity.activityType) {
        case 'viewed':
          if (!prevStats.viewedProperties.includes(activity.propertyId)) {
            updatedStats.propertiesViewed += 1;
            updatedStats.viewedProperties = [...prevStats.viewedProperties, activity.propertyId];
          }
          break;
        case 'favorited':
          updatedStats.propertiesFavorited += 1;
          break;
        case 'contacted':
          updatedStats.agentsContacted += 1;
          break;
        case 'shared':
          updatedStats.propertiesShared += 1;
          break;
      }
      
      updatedStats.totalActivities += 1;
      
      return updatedStats;
    });
  };

  const toggleFavorite = (propertyId: string, propertyTitle: string, propertyLocation: string, propertyPrice: number) => {
    if (!user) return;

    setStats(prevStats => {
      const isFavorited = prevStats.favoriteProperties.includes(propertyId);
      const updatedStats = { ...prevStats };
      
      if (isFavorited) {
        // Remove from favorites
        updatedStats.favoriteProperties = prevStats.favoriteProperties.filter(id => id !== propertyId);
        updatedStats.propertiesFavorited = Math.max(0, prevStats.propertiesFavorited - 1);
        
        // Add unfavorite activity
        const unfavoriteActivity: PropertyActivity = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          propertyId,
          propertyTitle,
          propertyLocation,
          propertyPrice,
          activityType: 'favorited',
          timestamp: new Date().toISOString()
        };
        updatedStats.recentActivities = [unfavoriteActivity, ...prevStats.recentActivities].slice(0, 20);
      } else {
        // Add to favorites
        updatedStats.favoriteProperties = [...prevStats.favoriteProperties, propertyId];
        updatedStats.propertiesFavorited += 1;
        
        // Add favorite activity
        addActivity({
          propertyId,
          propertyTitle,
          propertyLocation,
          propertyPrice,
          activityType: 'favorited'
        });
      }
      
      return updatedStats;
    });
  };

  const isFavorited = (propertyId: string): boolean => {
    return stats.favoriteProperties.includes(propertyId);
  };

  const clearActivities = () => {
    if (user) {
      localStorage.removeItem(`userActivity_${user.id}`);
      setStats({
        propertiesViewed: 0,
        propertiesFavorited: 0,
        agentsContacted: 0,
        propertiesShared: 0,
        totalActivities: 0,
        recentActivities: [],
        favoriteProperties: [],
        viewedProperties: []
      });
    }
  };

  const value = {
    stats,
    addActivity,
    toggleFavorite,
    isFavorited,
    clearActivities
  };

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};