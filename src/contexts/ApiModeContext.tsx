import React, { createContext, useContext, useState, useEffect } from 'react';
import { propertyApi } from '../services/propertyApi';

interface ApiModeContextType {
  isUsingMockData: boolean;
  toggleApiMode: (useMock: boolean) => void;
  refreshTrigger: number; // This will trigger re-fetches
}

const ApiModeContext = createContext<ApiModeContextType | undefined>(undefined);

export const useApiMode = () => {
  const context = useContext(ApiModeContext);
  if (context === undefined) {
    throw new Error('useApiMode must be used within an ApiModeProvider');
  }
  return context;
};

export const ApiModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUsingMockData, setIsUsingMockData] = useState(propertyApi.getDataSourceMode());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const toggleApiMode = (useMock: boolean) => {
    propertyApi.setUseMockData(useMock);
    setIsUsingMockData(useMock);
    // Increment refresh trigger to notify all components to re-fetch
    setRefreshTrigger(prev => prev + 1);
  };

  const value = {
    isUsingMockData,
    toggleApiMode,
    refreshTrigger
  };

  return (
    <ApiModeContext.Provider value={value}>
      {children}
    </ApiModeContext.Provider>
  );
};