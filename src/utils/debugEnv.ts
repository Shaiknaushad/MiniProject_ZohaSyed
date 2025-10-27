// Debug environment variables
export const debugEnvironment = () => {
  console.log('🔧 Environment Debug Info:');
  console.log('- MODE:', import.meta.env.MODE);
  console.log('- VITE_USE_MOCK_DATA:', import.meta.env.VITE_USE_MOCK_DATA);
  console.log('- VITE_RAPIDAPI_KEY:', import.meta.env.VITE_RAPIDAPI_KEY ? 'Set (length: ' + import.meta.env.VITE_RAPIDAPI_KEY.length + ')' : 'Not set');
  console.log('- All VITE_ vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  
  // Test the logic
  const mockDataLogic = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
  console.log('- Mock Data Logic Result:', mockDataLogic);
  console.log('- String comparison:', `"${import.meta.env.VITE_USE_MOCK_DATA}" !== "false" = ${import.meta.env.VITE_USE_MOCK_DATA !== 'false'}`);
};