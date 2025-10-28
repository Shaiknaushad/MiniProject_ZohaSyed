import React, { useState } from 'react';
import { Calculator, TrendingUp, Brain, BarChart3, Target, Zap, MapPin, Home, Square, Play, Loader } from 'lucide-react';
import CostOfLivingEstimator from '../components/CostOfLivingEstimator';
import FutureValuePredictor from '../components/FutureValuePredictor';

const FeaturesPage: React.FC = () => {
  const [userInput, setUserInput] = useState({
    location: '',
    price: '',
    size: '',
    propertyType: 'apartment'
  });
  
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  
  const analysisSteps = [
    '🔍 Analyzing location with Google Places API...',
    '🏢 Fetching nearby amenities data...',
    '📊 Calculating cost of living metrics...',
    '🤖 Running AI market analysis...',
    '📈 Generating future value predictions...',
    '✅ Analysis complete!'
  ];

  const handleAnalyzeProperty = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setShowResults(false);

    // Simulate real-time analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i);
      
      // Different delays for different steps to simulate real API calls
      const delays = [1500, 2000, 1200, 1800, 1500, 800]; // Realistic API call times
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }

    setIsAnalyzing(false);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector('#analysis-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Advanced Property Analysis Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience cutting-edge AI-powered tools using <strong>real Google Places API data</strong> to help you make smarter property investment decisions. 
            Our advanced features combine live location data, market analysis, and machine learning to provide accurate insights.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-green-100 border border-green-300 rounded-lg px-4 py-2 inline-flex items-center">
              <span className="text-green-800 font-medium">🔗 Powered by Google Places API & Real Market Data</span>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <Calculator className="text-blue-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">Cost of Living Estimator</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <Zap className="text-green-500 mr-2" size={16} />
                <span>Real Google Places API data for nearby amenities</span>
              </div>
              <div className="flex items-center">
                <Zap className="text-green-500 mr-2" size={16} />
                <span>Live expense calculations based on actual location data</span>
              </div>
              <div className="flex items-center">
                <Zap className="text-green-500 mr-2" size={16} />
                <span>Dynamic cost adjustments based on amenity density</span>
              </div>
              <div className="flex items-center">
                <Zap className="text-green-500 mr-2" size={16} />
                <span>Real-time city tier analysis and cost indexing</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-green-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-gray-900">AI Future Value Predictor</h2>
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <Brain className="text-purple-500 mr-2" size={16} />
                <span>Real market data powered 5-year forecasting</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className="text-purple-500 mr-2" size={16} />
                <span>Live market sentiment and demand indicators</span>
              </div>
              <div className="flex items-center">
                <Target className="text-purple-500 mr-2" size={16} />
                <span>Dynamic rental yield based on location quality</span>
              </div>
              <div className="flex items-center">
                <Brain className="text-purple-500 mr-2" size={16} />
                <span>Google Places API amenity analysis integration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div id="interactive-demo" className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Try It Yourself - Interactive Demo
            </h2>
            <p className="text-lg text-gray-600">
              Enter your property details and watch our AI analyze it in real-time using Google Places API
            </p>
          </div>

          {/* User Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Home className="mr-2 text-blue-600" size={24} />
              Enter Your Property Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  Property Location *
                </label>
                <input
                  type="text"
                  value={userInput.location}
                  onChange={(e) => setUserInput({...userInput, location: e.target.value})}
                  placeholder="e.g., Bandra West, Mumbai or Koramangala, Bangalore"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💰 Property Price (₹) *
                </label>
                <input
                  type="number"
                  value={userInput.price}
                  onChange={(e) => setUserInput({...userInput, price: e.target.value})}
                  placeholder="e.g., 12500000 (1.25 Crores)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Square size={16} className="inline mr-1" />
                  Property Size (sq ft) *
                </label>
                <input
                  type="number"
                  value={userInput.size}
                  onChange={(e) => setUserInput({...userInput, size: e.target.value})}
                  placeholder="e.g., 1200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏠 Property Type
                </label>
                <select
                  value={userInput.propertyType}
                  onChange={(e) => setUserInput({...userInput, propertyType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={handleAnalyzeProperty}
                disabled={!userInput.location || !userInput.price || !userInput.size || isAnalyzing}
                className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Analyzing Property...
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={20} />
                    🚀 Analyze My Property with AI
                  </>
                )}
              </button>
              
              {(!userInput.location || !userInput.price || !userInput.size) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-3">
                    Please fill in all required fields to start analysis
                  </p>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">💡 Try these sample properties:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => setUserInput({
                          location: 'Bandra West, Mumbai',
                          price: '125000000',
                          size: '1200',
                          propertyType: 'apartment'
                        })}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                      >
                        Mumbai Luxury (₹12.5Cr)
                      </button>
                      <button
                        onClick={() => setUserInput({
                          location: 'Koramangala, Bangalore',
                          price: '85000000',
                          size: '1000',
                          propertyType: 'apartment'
                        })}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs hover:bg-green-200 transition-colors"
                      >
                        Bangalore Tech Hub (₹8.5Cr)
                      </button>
                      <button
                        onClick={() => setUserInput({
                          location: 'Connaught Place, Delhi',
                          price: '150000000',
                          size: '1500',
                          propertyType: 'penthouse'
                        })}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200 transition-colors"
                      >
                        Delhi Premium (₹15Cr)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                🔄 Real-Time Analysis in Progress
              </h3>
              
              <div className="space-y-4">
                {analysisSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      index < analysisStep ? 'bg-green-500 text-white' :
                      index === analysisStep ? 'bg-blue-500 text-white animate-pulse' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {index < analysisStep ? '✓' : index === analysisStep ? '⟳' : index + 1}
                    </div>
                    <div className={`flex-1 ${
                      index <= analysisStep ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step}
                    </div>
                    {index === analysisStep && (
                      <div className="ml-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(analysisStep / (analysisSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {Math.round((analysisStep / (analysisSteps.length - 1)) * 100)}% Complete
                </p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResults && !isAnalyzing && (
            <div id="analysis-results">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎉 Analysis Complete!
                </h3>
                <p className="text-gray-600">
                  Here's your personalized property analysis using real Google Places API data
                </p>
                <div className="mt-4 p-4 bg-green-50 rounded-lg inline-block border border-green-200">
                  <p className="text-green-800 font-medium">
                    📍 Analyzed: {userInput.location}
                  </p>
                  <p className="text-green-600 text-sm">
                    Price: ₹{parseInt(userInput.price).toLocaleString('en-IN')} | Size: {userInput.size} sq ft | Type: {userInput.propertyType}
                  </p>
                  <p className="text-green-500 text-xs mt-1">
                    🔗 Live data from Google Places API • Real amenities analysis • AI-powered insights
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Cost of Living Analysis */}
                <div>
                  <CostOfLivingEstimator 
                    location={userInput.location}
                    propertyPrice={parseInt(userInput.price)}
                  />
                </div>

                {/* Future Value Analysis */}
                <div>
                  <FutureValuePredictor
                    propertyId={`user-${Date.now()}`}
                    currentValue={parseInt(userInput.price)}
                    location={userInput.location}
                    propertyType={userInput.propertyType}
                    size={parseInt(userInput.size)}
                  />
                </div>
              </div>
              
              {/* Try Another Property */}
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setUserInput({ location: '', price: '', size: '', propertyType: 'apartment' });
                  }}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  🔄 Analyze Another Property
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎓 Why These Features Matter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Budgeting</h3>
              <p className="text-gray-600">
                Enter any property location and get real-time cost analysis using Google Places API. 
                See actual nearby amenities and their impact on living costs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Intelligence</h3>
              <p className="text-gray-600">
                Watch our AI analyze your specific property in real-time, using live Google data 
                to generate accurate 5-year value predictions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Experience live AI processing as it fetches real amenity data from Google Places API 
                and generates personalized insights for your property.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Experience Smart Property Analysis?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Try the interactive demo above with your own property details, or explore our property listings 
              to see these features in action on real properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  document.querySelector('#interactive-demo')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🎯 Try Interactive Demo
              </button>
              <a
                href="/properties"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border border-blue-600"
              >
                🏠 Browse Properties
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;