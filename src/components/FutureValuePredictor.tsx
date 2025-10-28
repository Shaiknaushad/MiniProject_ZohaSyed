import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { predictFutureValue, FutureValuePrediction } from '../services/futureValueService';
import { formatPrice } from '../utils/formatters';

interface FutureValuePredictorProps {
    propertyId: string;
    currentValue: number;
    location: string;
    propertyType?: string;
    size?: number;
}

const FutureValuePredictor: React.FC<FutureValuePredictorProps> = ({
    propertyId,
    currentValue,
    location,
    propertyType = 'apartment',
    size = 100
}) => {
    const [prediction, setPrediction] = useState<FutureValuePrediction | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number>(5);

    useEffect(() => {
        const generatePrediction = async () => {
            setLoading(true);
            try {
                const data = await predictFutureValue(propertyId, currentValue, location, propertyType, size);
                setPrediction(data);
            } catch (error) {
                console.error('Error predicting future value:', error);
                // You could set an error state here if needed
            } finally {
                setLoading(false);
            }
        };

        generatePrediction();
    }, [propertyId, currentValue, location, propertyType, size]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                    <TrendingUp className="text-green-600 mr-3" size={24} />
                    <h3 className="text-xl font-semibold text-gray-900">AI Future Value Predictor</h3>
                </div>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 bg-gray-100 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-gray-100 rounded"></div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!prediction) return null;

    const selectedPrediction = prediction.predictions[selectedYear - 1];
    const maxValue = Math.max(...prediction.predictions.map(p => p.resaleValue));

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return 'text-green-600 bg-green-50';
            case 'Medium': return 'text-yellow-600 bg-yellow-50';
            case 'High': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return CheckCircle;
        if (score >= 60) return AlertTriangle;
        return XCircle;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <TrendingUp className="text-green-600 mr-3" size={24} />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">AI Future Value Predictor</h3>
                        <p className="text-sm text-gray-600">5-year property value forecast</p>
                    </div>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.riskLevel)}`}>
                    {prediction.riskLevel} Risk
                </div>
            </div>

            {/* Year Selector */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Select Year:</span>
                </div>
                <div className="flex space-x-2">
                    {prediction.predictions.map((pred, index) => (
                        <button
                            key={pred.year}
                            onClick={() => setSelectedYear(index + 1)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedYear === index + 1
                                ? 'bg-blue-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {pred.year}
                        </button>
                    ))}
                </div>
            </div>

            {/* Value Prediction Chart */}
            <div className="mb-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Value Projection</h4>
                        <span className="text-sm text-gray-600">Confidence: {selectedPrediction.confidence}%</span>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Current Value</span>
                            <span className="font-semibold">{formatPrice(currentValue)}</span>
                        </div>

                        {prediction.predictions.map((pred, index) => (
                            <div key={pred.year} className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600 w-12">{pred.year}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${index + 1 === selectedYear ? 'bg-blue-900' : 'bg-blue-600'
                                            }`}
                                        style={{ width: `${(pred.resaleValue / maxValue) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium w-24 text-right">
                                    {formatPrice(pred.resaleValue)}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${pred.appreciation > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    +{pred.appreciation}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Year Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <Target className="text-blue-600 mr-2" size={20} />
                        <h5 className="font-semibold text-gray-900">Resale Value ({selectedPrediction.year})</h5>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{formatPrice(selectedPrediction.resaleValue)}</p>
                    <p className="text-sm text-gray-600">
                        {selectedPrediction.appreciation > 0 ? '+' : ''}{selectedPrediction.appreciation}% appreciation
                    </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <TrendingUp className="text-green-600 mr-2" size={20} />
                        <h5 className="font-semibold text-gray-900">Rental Value ({selectedPrediction.year})</h5>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{formatPrice(selectedPrediction.rentValue)}/month</p>
                    <p className="text-sm text-gray-600">
                        Annual yield: {((selectedPrediction.rentValue * 12 / selectedPrediction.resaleValue) * 100).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Market Factors */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Market Analysis Factors</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(prediction.factors).map(([key, score]) => {
                        const Icon = getScoreIcon(score);
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                        return (
                            <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                <Icon className={`mx-auto mb-2 ${getScoreColor(score)}`} size={24} />
                                <p className="text-sm font-medium text-gray-900">{label}</p>
                                <p className={`text-lg font-bold ${getScoreColor(score)}`}>{score}/100</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Real Market Data */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Real Market Intelligence</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Search Trend</p>
                        <p className="text-xl font-bold text-blue-900">{prediction.marketData?.searchTrend || 0}/100</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Demand Index</p>
                        <p className="text-xl font-bold text-green-900">{prediction.marketData?.demandIndicator || 0}/100</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Market Sentiment</p>
                        <p className="text-sm font-bold text-purple-900 capitalize">{prediction.marketData?.marketSentiment || 'neutral'}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600">Amenities</p>
                        <p className="text-xl font-bold text-yellow-900">{prediction.nearbyAmenities?.total || 0}</p>
                    </div>
                </div>
            </div>

            {/* AI Recommendation */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="bg-purple-100 rounded-full p-2 mr-3 mt-1">
                        <TrendingUp className="text-purple-600" size={16} />
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-1">AI Investment Recommendation</h5>
                        <p className="text-gray-700">{prediction.recommendation}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                🤖 Real AI Analysis
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                📊 Google Places API
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                📈 Live Market Data
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                    <strong>Disclaimer:</strong> Predictions use real Google Places API data, market trends, and AI analysis. 
                    Actual values may vary due to market conditions, economic factors, and unforeseen circumstances.
                    This tool provides estimates based on current data and should not replace professional financial advice.
                </p>
            </div>
        </div>
    );
};

export default FutureValuePredictor;