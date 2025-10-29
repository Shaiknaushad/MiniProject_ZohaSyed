import React from 'react';
import { Database, Cloud } from 'lucide-react';
import { useApiMode } from '../contexts/ApiModeContext';

const ApiModeToggle: React.FC = () => {
  const { isUsingMockData, toggleApiMode } = useApiMode();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Database size={20} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Data Source:</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Mock Data Button */}
          <button
            onClick={() => toggleApiMode(true)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isUsingMockData
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Database size={16} className="mr-2" />
            Mock Data (8)
          </button>
          
          {/* Real API Button */}
          <button
            onClick={() => toggleApiMode(false)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !isUsingMockData
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Cloud size={16} className="mr-2" />
            Real API (150+)
          </button>
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Currently showing: {isUsingMockData ? 'Sample properties' : 'Live RapidAPI data'}
          </span>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isUsingMockData ? 'bg-blue-500' : 'bg-green-500'
            }`}></div>
            <span className="font-medium">
              {isUsingMockData ? 'Mock Mode' : 'Live Mode'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiModeToggle;