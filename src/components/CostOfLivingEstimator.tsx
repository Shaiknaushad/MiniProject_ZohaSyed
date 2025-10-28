import React, { useState, useEffect } from 'react';
import { Calculator, Home, ShoppingCart, Car, Zap, Heart, Coffee, Info } from 'lucide-react';
import { calculateCostOfLiving, CostOfLivingData } from '../services/costOfLivingService';
import { formatPrice } from '../utils/formatters';

interface CostOfLivingEstimatorProps {
  location: string;
  propertyPrice: number;
}

const CostOfLivingEstimator: React.FC<CostOfLivingEstimatorProps> = ({ 
  location, 
  propertyPrice 
}) => {
  const [costData, setCostData] = useState<CostOfLivingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateCosts = async () => {
      setLoading(true);
      try {
        const data = await calculateCostOfLiving(location, propertyPrice);
        setCostData(data);
      } catch (error) {
        console.error('Error calculating cost of living:', error);
        // You could set an error state here if needed
      } finally {
        setLoading(false);
      }
    };

    calculateCosts();
  }, [location, propertyPrice]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Calculator className="text-blue-900 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-gray-900">Cost of Living Estimator</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!costData) return null;

  const expenseItems = [
    { 
      key: 'rentOrLoan', 
      label: 'Home Loan/Rent', 
      icon: Home, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50' 
    },
    { 
      key: 'groceries', 
      label: 'Groceries & Food', 
      icon: ShoppingCart, 
      color: 'text-green-600',
      bgColor: 'bg-green-50' 
    },
    { 
      key: 'transportation', 
      label: 'Transportation', 
      icon: Car, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50' 
    },
    { 
      key: 'utilities', 
      label: 'Utilities', 
      icon: Zap, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50' 
    },
    { 
      key: 'healthcare', 
      label: 'Healthcare', 
      icon: Heart, 
      color: 'text-red-600',
      bgColor: 'bg-red-50' 
    },
    { 
      key: 'entertainment', 
      label: 'Entertainment', 
      icon: Coffee, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50' 
    }
  ];

  const getCostIndexColor = (index: number) => {
    if (index < 80) return 'text-green-600 bg-green-50';
    if (index < 120) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCostIndexLabel = (index: number) => {
    if (index < 80) return 'Below Average';
    if (index < 120) return 'Average';
    return 'Above Average';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator className="text-blue-900 mr-3" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Cost of Living Estimator</h3>
            <p className="text-sm text-gray-600">Monthly expenses in {location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCostIndexColor(costData.costIndex)}`}>
            <Info size={14} className="mr-1" />
            {getCostIndexLabel(costData.costIndex)}
          </div>
          <p className="text-xs text-gray-500 mt-1">{costData.cityTier} City</p>
        </div>
      </div>

      {/* Total Monthly Cost */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 mb-6 text-white">
        <div className="text-center">
          <p className="text-blue-100 text-sm">Total Monthly Expenses</p>
          <p className="text-3xl font-bold">{formatPrice(costData.totalMonthly)}</p>
          <p className="text-blue-100 text-sm mt-1">
            Cost Index: {costData.costIndex} (National Avg: 100)
          </p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Monthly Expense Breakdown</h4>
        
        {expenseItems.map(({ key, label, icon: Icon, color, bgColor }) => {
          const amount = costData.monthlyExpenses[key as keyof typeof costData.monthlyExpenses];
          const percentage = ((amount / costData.totalMonthly) * 100).toFixed(1);
          
          return (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${bgColor} mr-3`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500">{percentage}% of total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatPrice(amount)}</p>
              </div>
            </div>
          );
        })}

        {/* Miscellaneous */}
        <div className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gray-50 mr-3">
              <Calculator size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Miscellaneous</p>
              <p className="text-sm text-gray-500">
                {((costData.monthlyExpenses.miscellaneous / costData.totalMonthly) * 100).toFixed(1)}% of total
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">{formatPrice(costData.monthlyExpenses.miscellaneous)}</p>
          </div>
        </div>
      </div>

      {/* Nearby Amenities */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-3">🏢 Nearby Amenities (Real Data)</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🍽️ Restaurants</span>
            <span className="font-medium">{costData.nearbyAmenities?.restaurants || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🏥 Hospitals</span>
            <span className="font-medium">{costData.nearbyAmenities?.hospitals || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🏫 Schools</span>
            <span className="font-medium">{costData.nearbyAmenities?.schools || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🛍️ Shopping</span>
            <span className="font-medium">{costData.nearbyAmenities?.shopping || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🚇 Transport</span>
            <span className="font-medium">{costData.nearbyAmenities?.transport || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">🏦 Banks</span>
            <span className="font-medium">{costData.nearbyAmenities?.banks || 0}</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-semibold text-gray-900 mb-2">💡 Planning Tips</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Home loan EMI calculated at 8.5% interest for 30 years</li>
          <li>• Costs calculated using real Google Places API data</li>
          <li>• Amenity density affects local cost of living</li>
          <li>• Consider emergency fund of 6-12 months expenses</li>
          <li>• {costData.cityTier} cities typically have {costData.cityTier === 'Tier 1' ? 'higher' : costData.cityTier === 'Tier 2' ? 'moderate' : 'lower'} living costs</li>
        </ul>
      </div>
    </div>
  );
};

export default CostOfLivingEstimator;