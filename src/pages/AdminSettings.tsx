import React, { useState } from 'react';
import { propertyApi } from '../services/propertyApi';
import { Settings, Database, Cloud, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSettings: React.FC = () => {
  const [currentMode, setCurrentMode] = useState(propertyApi.getDataSourceMode());
  const [testResult, setTestResult] = useState<string>('');

  const handleModeToggle = (useMock: boolean) => {
    propertyApi.setUseMockData(useMock);
    setCurrentMode(useMock);
    setTestResult(`Switched to ${useMock ? 'Mock Data' : 'Real API'} mode`);
  };

  const testCurrentAPI = async () => {
    try {
      setTestResult('Testing...');
      const result = await propertyApi.getProperties({ limit: 3 });
      setTestResult(`✅ Success: Found ${result.total} properties (${result.properties.length} loaded)`);
    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Settings size={28} className="text-blue-900 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            </div>
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Data Source</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="dataSource"
                    checked={currentMode}
                    onChange={() => handleModeToggle(true)}
                    className="mr-3"
                  />
                  <Database size={20} className="mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Mock Data</div>
                    <div className="text-sm text-gray-600">Fast loading, Indian properties, no API calls</div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="dataSource"
                    checked={!currentMode}
                    onChange={() => handleModeToggle(false)}
                    className="mr-3"
                  />
                  <Cloud size={20} className="mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">Real API (RapidAPI)</div>
                    <div className="text-sm text-gray-600">Live data from RapidAPI, adapted for Indian market</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Testing</h2>
              <button
                onClick={testCurrentAPI}
                className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                Test Current API Configuration
              </button>
              
              {testResult && (
                <div className={`mt-4 p-4 rounded-lg ${
                  testResult.includes('✅') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : testResult.includes('❌')
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  {testResult}
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div><strong>Mode:</strong> {currentMode ? 'Mock Data' : 'Real API'}</div>
                <div><strong>Environment:</strong> {import.meta.env.MODE}</div>
                <div><strong>API Key:</strong> {import.meta.env.VITE_RAPIDAPI_KEY ? 'Configured' : 'Not Set'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;