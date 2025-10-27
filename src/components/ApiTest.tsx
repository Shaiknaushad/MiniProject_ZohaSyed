import React, { useState } from 'react';
import { propertyApi } from '../services/propertyApi';
import { testRapidAPIDirectly } from '../utils/testRapidAPI';
import { debugEnvironment } from '../utils/debugEnv';
import { useApiMode } from '../contexts/ApiModeContext';

const ApiTest: React.FC = () => {
  const { isUsingMockData, toggleApiMode } = useApiMode();
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRapidAPI = async () => {
    setLoading(true);
    setTestResult('Testing RapidAPI directly...');
    
    try {
      const result = await testRapidAPIDirectly();
      
      if (result.success) {
        setTestResult(`✅ RapidAPI Direct Test Success! 
        - Properties Found: ${result.propertiesCount}
        - API Response: Valid
        - Status: Working correctly`);
      } else {
        setTestResult(`❌ RapidAPI Direct Test Failed: 
        ${result.error}`);
      }
      
    } catch (error) {
      setTestResult(`❌ RapidAPI Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testViaService = async () => {
    setLoading(true);
    setTestResult('Testing via Property Service...');
    
    try {
      // Force use real API
      propertyApi.setUseMockData(false);
      
      const result = await propertyApi.getProperties({ limit: 3 });
      
      setTestResult(`✅ Service API Success! 
      - Found ${result.total} total properties
      - Loaded ${result.properties.length} properties
      - First property: ${result.properties[0]?.title || 'None'}
      - Mode: ${propertyApi.getDataSourceMode() ? 'Mock' : 'Real API'}`);
      
    } catch (error) {
      setTestResult(`❌ Service API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testMockAPI = async () => {
    setLoading(true);
    setTestResult('Testing Mock API...');
    
    try {
      // Force use mock data
      propertyApi.setUseMockData(true);
      
      const result = await propertyApi.getProperties({ limit: 3 });
      
      setTestResult(`✅ Mock API Success! 
      - Found ${result.total} total properties
      - Loaded ${result.properties.length} properties
      - First property: ${result.properties[0]?.title || 'None'}
      - Mode: ${propertyApi.getDataSourceMode() ? 'Mock' : 'Real API'}`);
      
    } catch (error) {
      setTestResult(`❌ Mock API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-gray-800 mb-3">🧪 API Test Panel</h3>
      
      <div className="space-y-2 mb-4">
        <button
          onClick={testRapidAPI}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test RapidAPI Direct'}
        </button>
        
        <button
          onClick={testViaService}
          disabled={loading}
          className="w-full bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Via Service'}
        </button>
        
        <button
          onClick={testMockAPI}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Mock API'}
        </button>
        
        <div className="flex space-x-1">
          <button
            onClick={() => {
              toggleApiMode(false);
              setTestResult('Switched to Real API mode - Properties will refresh');
            }}
            className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
              !isUsingMockData 
                ? 'bg-green-600 text-white' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Use Real API
          </button>
          <button
            onClick={() => {
              toggleApiMode(true);
              setTestResult('Switched to Mock mode - Properties will refresh');
            }}
            className={`flex-1 py-1 px-2 rounded text-xs transition-colors ${
              isUsingMockData 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Use Mock
          </button>
        </div>
        
        <button
          onClick={() => {
            debugEnvironment();
            setTestResult('Check browser console for environment debug info');
          }}
          className="w-full bg-purple-600 text-white py-1 px-2 rounded text-xs hover:bg-purple-700"
        >
          Debug Environment
        </button>
      </div>

      {testResult && (
        <div className={`p-3 rounded text-xs whitespace-pre-line ${
          testResult.includes('✅') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {testResult}
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <div>Current Mode: {isUsingMockData ? 'Mock' : 'Real API'}</div>
        <div>API Key: {import.meta.env.VITE_RAPIDAPI_KEY ? 'Set' : 'Missing'}</div>
        <div>Env VITE_USE_MOCK_DATA: {import.meta.env.VITE_USE_MOCK_DATA || 'undefined'}</div>
        <div>Environment: {import.meta.env.MODE}</div>
      </div>
    </div>
  );
};

export default ApiTest;