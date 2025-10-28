import { googleApiService } from './googleApiService';

// Cost of Living Service - Calculates monthly expenses based on real location data
export interface CostOfLivingData {
  location: string;
  monthlyExpenses: {
    rentOrLoan: number;
    groceries: number;
    transportation: number;
    utilities: number;
    healthcare: number;
    entertainment: number;
    miscellaneous: number;
  };
  totalMonthly: number;
  cityTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  costIndex: number; // Relative to national average (100 = average)
  nearbyAmenities: {
    restaurants: number;
    hospitals: number;
    schools: number;
    shopping: number;
    transport: number;
    banks: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Base cost data for different city tiers in India
const baseCosts = {
  'Tier 1': {
    groceries: 8000,
    transportation: 3500,
    utilities: 2500,
    healthcare: 2000,
    entertainment: 4000,
    miscellaneous: 3000
  },
  'Tier 2': {
    groceries: 6000,
    transportation: 2500,
    utilities: 1800,
    healthcare: 1500,
    entertainment: 2500,
    miscellaneous: 2200
  },
  'Tier 3': {
    groceries: 4500,
    transportation: 1800,
    utilities: 1200,
    healthcare: 1000,
    entertainment: 1500,
    miscellaneous: 1500
  }
};

// City classifications and multipliers
const cityData: Record<string, { tier: 'Tier 1' | 'Tier 2' | 'Tier 3'; multiplier: number }> = {
  // Tier 1 Cities
  'Mumbai': { tier: 'Tier 1', multiplier: 1.4 },
  'Delhi': { tier: 'Tier 1', multiplier: 1.3 },
  'Bangalore': { tier: 'Tier 1', multiplier: 1.2 },
  'Chennai': { tier: 'Tier 1', multiplier: 1.1 },
  'Hyderabad': { tier: 'Tier 1', multiplier: 1.1 },
  'Pune': { tier: 'Tier 1', multiplier: 1.0 },
  'Kolkata': { tier: 'Tier 1', multiplier: 0.9 },
  
  // Tier 2 Cities
  'Ahmedabad': { tier: 'Tier 2', multiplier: 0.9 },
  'Jaipur': { tier: 'Tier 2', multiplier: 0.8 },
  'Lucknow': { tier: 'Tier 2', multiplier: 0.8 },
  'Kanpur': { tier: 'Tier 2', multiplier: 0.7 },
  'Nagpur': { tier: 'Tier 2', multiplier: 0.8 },
  'Indore': { tier: 'Tier 2', multiplier: 0.8 },
  'Thane': { tier: 'Tier 2', multiplier: 1.1 },
  'Bhopal': { tier: 'Tier 2', multiplier: 0.7 },
  'Visakhapatnam': { tier: 'Tier 2', multiplier: 0.8 },
  'Pimpri': { tier: 'Tier 2', multiplier: 0.9 },
  
  // Tier 3 Cities
  'Patna': { tier: 'Tier 3', multiplier: 0.6 },
  'Vadodara': { tier: 'Tier 3', multiplier: 0.7 },
  'Ghaziabad': { tier: 'Tier 3', multiplier: 0.8 },
  'Ludhiana': { tier: 'Tier 3', multiplier: 0.7 },
  'Agra': { tier: 'Tier 3', multiplier: 0.6 },
  'Nashik': { tier: 'Tier 3', multiplier: 0.7 },
  'Faridabad': { tier: 'Tier 3', multiplier: 0.8 },
  'Meerut': { tier: 'Tier 3', multiplier: 0.6 },
  'Rajkot': { tier: 'Tier 3', multiplier: 0.7 },
  'Kalyan': { tier: 'Tier 3', multiplier: 0.8 }
};

export const calculateCostOfLiving = async (location: string, propertyPrice: number): Promise<CostOfLivingData> => {
  try {
    // Get real location data from Google API
    const locationData = await googleApiService.getCostOfLivingData(location);
    
    // Calculate rent/loan based on property price
    // Assume 30-year loan at 8.5% interest rate
    const monthlyLoan = calculateEMI(propertyPrice, 8.5, 30);
    
    // Calculate expenses based on real location data
    const expenses = {
      rentOrLoan: monthlyLoan,
      groceries: Math.round(locationData.averageCosts.groceryIndex * 60), // Base grocery cost * index
      transportation: locationData.averageCosts.transportCost,
      utilities: locationData.averageCosts.utilityCost,
      healthcare: Math.round(getHealthcareCost(locationData.cityTier, locationData.nearbyAmenities.hospitals.length)),
      entertainment: Math.round(locationData.averageCosts.diningCost * 15), // Entertainment budget
      miscellaneous: Math.round(getTotalBaseCost(locationData.cityTier) * 0.15) // 15% of base costs
    };
    
    const totalMonthly = Object.values(expenses).reduce((sum, cost) => sum + cost, 0);
    
    return {
      location,
      monthlyExpenses: expenses,
      totalMonthly,
      cityTier: locationData.cityTier,
      costIndex: locationData.costIndex,
      nearbyAmenities: {
        restaurants: locationData.nearbyAmenities.restaurants.length,
        hospitals: locationData.nearbyAmenities.hospitals.length,
        schools: locationData.nearbyAmenities.schools.length,
        shopping: locationData.nearbyAmenities.shopping.length,
        transport: locationData.nearbyAmenities.transport.length,
        banks: locationData.nearbyAmenities.banks.length
      },
      coordinates: locationData.coordinates
    };
  } catch (error) {
    console.error('Error calculating cost of living:', error);
    // Fallback to static calculation
    return calculateFallbackCostOfLiving(location, propertyPrice);
  }
};

// Fallback calculation when API fails
const calculateFallbackCostOfLiving = (location: string, propertyPrice: number): CostOfLivingData => {
  const city = extractCityFromLocation(location);
  const cityInfo = cityData[city] || { tier: 'Tier 2' as const, multiplier: 0.8 };
  
  const baseCost = baseCosts[cityInfo.tier];
  const monthlyLoan = calculateEMI(propertyPrice, 8.5, 30);
  
  const expenses = {
    rentOrLoan: monthlyLoan,
    groceries: Math.round(baseCost.groceries * cityInfo.multiplier),
    transportation: Math.round(baseCost.transportation * cityInfo.multiplier),
    utilities: Math.round(baseCost.utilities * cityInfo.multiplier),
    healthcare: Math.round(baseCost.healthcare * cityInfo.multiplier),
    entertainment: Math.round(baseCost.entertainment * cityInfo.multiplier),
    miscellaneous: Math.round(baseCost.miscellaneous * cityInfo.multiplier)
  };
  
  const totalMonthly = Object.values(expenses).reduce((sum, cost) => sum + cost, 0);
  const nationalAverage = 25000;
  const costIndex = Math.round((totalMonthly / nationalAverage) * 100);
  
  return {
    location,
    monthlyExpenses: expenses,
    totalMonthly,
    cityTier: cityInfo.tier,
    costIndex,
    nearbyAmenities: {
      restaurants: 15,
      hospitals: 5,
      schools: 10,
      shopping: 8,
      transport: 6,
      banks: 12
    },
    coordinates: { lat: 19.0760, lng: 72.8777 }
  };
};

// Calculate healthcare costs based on city tier and hospital availability
const getHealthcareCost = (cityTier: string, hospitalCount: number): number => {
  const baseCosts = {
    'Tier 1': 2500,
    'Tier 2': 1800,
    'Tier 3': 1200
  };
  
  const base = baseCosts[cityTier as keyof typeof baseCosts];
  // More hospitals = potentially higher costs but better access
  const hospitalMultiplier = 1 + (hospitalCount / 50);
  
  return base * hospitalMultiplier;
};

// Get total base cost for a city tier
const getTotalBaseCost = (cityTier: string): number => {
  const totals = {
    'Tier 1': 23000,
    'Tier 2': 16500,
    'Tier 3': 11500
  };
  
  return totals[cityTier as keyof typeof totals];
};

// Helper function to extract city name from location
const extractCityFromLocation = (location: string): string => {
  // Split by comma and take the last part (usually the city)
  const parts = location.split(',').map(part => part.trim());
  const cityPart = parts[parts.length - 1];
  
  // Check if we have data for this city
  for (const city of Object.keys(cityData)) {
    if (cityPart.toLowerCase().includes(city.toLowerCase()) || 
        city.toLowerCase().includes(cityPart.toLowerCase())) {
      return city;
    }
  }
  
  // Default to a tier 2 city if not found
  return 'Pune';
};

// Calculate EMI (Equated Monthly Installment)
const calculateEMI = (principal: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / (12 * 100);
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(emi);
};

// Get cost comparison between cities
export const compareCostOfLiving = async (locations: string[]): Promise<CostOfLivingData[]> => {
  // Use average property price for comparison
  const avgPrice = 10000000; // 1 Crore INR
  
  const promises = locations.map(location => calculateCostOfLiving(location, avgPrice));
  return Promise.all(promises);
};