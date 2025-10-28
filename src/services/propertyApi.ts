import { Property } from '../types/property';

// Real Estate API service using RapidAPI
class PropertyApiService {
  private baseUrl = 'https://realty-in-us.p.rapidapi.com';
  private apiKey = import.meta.env.VITE_RAPIDAPI_KEY || '51af5b7aedmsh1a6ffd4855e6c54p1b605djsn803b6c18a6a4';
  private useMockData = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

  // Mock data that simulates API responses
  private mockProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Sky Residence',
      location: 'Bandra West, Mumbai',
      price: 125000000,
      size: 120,
      bedrooms: 2,
      bathrooms: 2,
      description: 'Experience the pinnacle of luxury living in this spectacular sky residence. Floor-to-ceiling windows offer breathtaking panoramic views of Mumbai\'s skyline and Arabian Sea.',
      amenities: ['Infinity Pool', 'Fitness Center', 'Rooftop Garden', 'Private Parking', '24/7 Security', 'Smart Home System'],
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg'
      ],
      featured: true,
      coordinates: { lat: 19.0596, lng: 72.8295 }
    },
    {
      id: '2',
      title: 'Riverside Oasis',
      location: 'Yamuna Expressway, Delhi',
      price: 180000000,
      size: 180,
      bedrooms: 3,
      bathrooms: 3,
      description: 'Stunning riverside condominium with unobstructed views of the Yamuna River. Premium imported materials and world-class amenities.',
      amenities: ['Private Pier', 'Infinity Edge Pool', 'Sky Lounge', 'Concierge Service', 'Tennis Court', 'Children\'s Playground'],
      images: [
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
        'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
        'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg'
      ],
      featured: true,
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: '3',
      title: 'Tech Hub Apartment',
      location: 'Electronic City, Bangalore',
      price: 95000000,
      size: 110,
      bedrooms: 2,
      bathrooms: 2,
      description: 'Modern apartment in Bangalore\'s tech hub. Perfect for IT professionals with easy access to major tech companies.',
      amenities: ['Co-working Space', 'High-speed Internet', 'Gym', 'Swimming Pool', 'Cafeteria', 'Shuttle Service'],
      images: [
        'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
        'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg',
        'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
      ],
      featured: false,
      coordinates: { lat: 12.8456, lng: 77.6603 }
    },
    {
      id: '4',
      title: 'Beachfront Villa',
      location: 'Candolim, Goa',
      price: 150000000,
      size: 200,
      bedrooms: 4,
      bathrooms: 3,
      description: 'Luxurious beachfront villa with private beach access. Perfect for vacation home or rental investment.',
      amenities: ['Private Beach', 'Swimming Pool', 'Garden', 'BBQ Area', 'Parking', 'Security'],
      images: [
        'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
        'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg',
        'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'
      ],
      featured: true,
      coordinates: { lat: 15.5166, lng: 73.7615 }
    },
    {
      id: '5',
      title: 'Heritage Haveli',
      location: 'Udaipur, Rajasthan',
      price: 200000000,
      size: 300,
      bedrooms: 5,
      bathrooms: 4,
      description: 'Restored heritage haveli with traditional Rajasthani architecture. Unique investment opportunity in the City of Lakes.',
      amenities: ['Courtyard', 'Traditional Architecture', 'Lake View', 'Heritage Value', 'Tourist Potential', 'Parking'],
      images: [
        'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
        'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
        'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg'
      ],
      featured: false,
      coordinates: { lat: 24.5854, lng: 73.7125 }
    },
    {
      id: '6',
      title: 'IT Park Apartment',
      location: 'Hitech City, Hyderabad',
      price: 85000000,
      size: 95,
      bedrooms: 2,
      bathrooms: 2,
      description: 'Contemporary apartment near major IT companies. Excellent connectivity and modern amenities.',
      amenities: ['Metro Connectivity', 'Shopping Mall', 'Food Court', 'Gym', 'Swimming Pool', 'Security'],
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
        'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
        'https://images.pexels.com/photos/2029698/pexels-photo-2029698.jpeg'
      ],
      featured: false,
      coordinates: { lat: 17.4485, lng: 78.3908 }
    },
    {
      id: '7',
      title: 'Startup Hub Loft',
      location: 'Koramangala, Bangalore',
      price: 110000000,
      size: 130,
      bedrooms: 2,
      bathrooms: 2,
      description: 'Trendy loft in Bangalore\'s startup ecosystem. Walking distance to cafes, co-working spaces, and venture capital firms.',
      amenities: ['Co-working Space', 'Rooftop Terrace', 'High-speed Internet', 'Cafeteria', 'Event Space', 'Parking'],
      images: [
        'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg'
      ],
      featured: false,
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    {
      id: '8',
      title: 'Backwater Resort',
      location: 'Alleppey, Kerala',
      price: 120000000,
      size: 150,
      bedrooms: 3,
      bathrooms: 2,
      description: 'Serene backwater resort property with traditional Kerala architecture. Perfect for eco-tourism business.',
      amenities: ['Backwater Access', 'Traditional Design', 'Boat Jetty', 'Organic Garden', 'Ayurveda Center', 'Restaurant'],
      images: [
        'https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg',
        'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg',
        'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
      ],
      featured: true,
      coordinates: { lat: 9.4981, lng: 76.3388 }
    }
  ];

  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all properties with optional filters
  async getProperties(filters?: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ properties: Property[]; total: number }> {
    try {
      const result = this.useMockData
        ? await this.getMockProperties(filters)
        : await this.fetchFromRealAPI(filters);

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    await this.delay(500);
    return this.mockProperties.find(p => p.id === id) || null;
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 4): Promise<Property[]> {
    await this.delay(600);
    return this.mockProperties.filter(p => p.featured).slice(0, limit);
  }

  // Search properties by text
  async searchProperties(query: string): Promise<Property[]> {
    await this.delay(700);
    const searchTerm = query.toLowerCase();
    return this.mockProperties.filter(p =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.location.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  // Get properties by location
  async getPropertiesByLocation(location: string): Promise<Property[]> {
    const result = await this.getProperties({ location });
    return result.properties;
  }

  // Toggle between mock and real API
  setUseMockData(useMock: boolean): void {
    this.useMockData = useMock;
  }

  // Get current data source mode
  getDataSourceMode(): boolean {
    return this.useMockData;
  }



  // Real API methods using RapidAPI
  private async fetchFromRealAPI(filters?: any): Promise<{ properties: Property[]; total: number }> {
    try {
      // Map Indian cities to US postal codes for demo purposes
      const locationMapping: { [key: string]: string } = {
        'mumbai': '90210', // Beverly Hills (luxury area)
        'delhi': '10001',  // Manhattan
        'bangalore': '94102', // San Francisco
        'goa': '33139',    // Miami Beach
        'pune': '78701',   // Austin
        'hyderabad': '98101', // Seattle
        'chennai': '02101',   // Boston
        'kolkata': '19103'    // Philadelphia
      };

      let postalCode = '90004'; // Default Los Angeles
      if (filters?.location) {
        const city = filters.location.toLowerCase();
        postalCode = locationMapping[city] || '90004';
      }

      const requestBody = {
        limit: filters?.limit || 200,
        offset: filters?.offset || 0,
        postal_code: postalCode,
        status: ["for_sale", "ready_to_build"],
        sort: {
          direction: "desc",
          field: "list_date"
        }
      };

      if (filters?.minPrice) {
        requestBody.price = { min: filters.minPrice };
      }
      if (filters?.maxPrice) {
        requestBody.price = { ...requestBody.price, max: filters.maxPrice };
      }

      const response = await fetch(`${this.baseUrl}/properties/v3/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
          'x-rapidapi-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Transform API response to our Property interface
      const transformedProperties: Property[] = data.data?.home_search?.results?.map((item: any, index: number) => ({
        id: item.property_id || `api-${index}`,
        title: item.description?.name || item.location?.address?.line || 'Property',
        location: this.transformLocation(item.location, filters?.location),
        price: this.convertToINR(item.list_price || item.price || 1000000),
        size: item.description?.sqft || Math.floor(Math.random() * 200) + 50,
        bedrooms: item.description?.beds || Math.floor(Math.random() * 4) + 1,
        bathrooms: item.description?.baths || Math.floor(Math.random() * 3) + 1,
        description: item.description?.text || 'Beautiful property in prime location',
        amenities: this.generateAmenities(),
        images: this.getPropertyImages(item),
        featured: Math.random() > 0.7,
        coordinates: {
          lat: item.location?.address?.coordinate?.lat || 19.0760,
          lng: item.location?.address?.coordinate?.lon || 72.8777
        }
      })) || [];

      return {
        properties: transformedProperties,
        total: data.data?.home_search?.total || transformedProperties.length
      };
    } catch (error) {
      // Fallback to mock data if real API fails
      return this.getMockProperties(filters);
    }
  }

  private transformLocation(location: any, filterLocation?: string): string {
    if (filterLocation) {
      const cityMap: { [key: string]: string[] } = {
        'mumbai': ['Bandra West', 'Juhu', 'Andheri', 'Powai', 'Lower Parel'],
        'delhi': ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Dwarka', 'Gurgaon'],
        'bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'HSR Layout'],
        'goa': ['Candolim', 'Calangute', 'Anjuna', 'Panjim', 'Margao'],
        'pune': ['Koregaon Park', 'Hinjewadi', 'Baner', 'Kothrud', 'Viman Nagar']
      };

      const areas = cityMap[filterLocation.toLowerCase()] || ['Central Area'];
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      return `${randomArea}, ${filterLocation.charAt(0).toUpperCase() + filterLocation.slice(1)}`;
    }

    return location?.address?.line || 'Prime Location, India';
  }

  private convertToINR(usdPrice: number): number {
    // Convert USD to INR (approximate rate: 1 USD = 83 INR)
    // Also adjust for Indian real estate market
    const inrPrice = usdPrice * 83;
    // Scale to Indian market (typically higher for luxury properties)
    return Math.floor(inrPrice * 1.5);
  }

  private generateAmenities(): string[] {
    const allAmenities = [
      'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Clubhouse',
      'Children\'s Play Area', 'Elevator', 'Power Backup', 'Water Supply',
      'Intercom', 'Maintenance Staff', 'CCTV', 'Fire Safety', 'Vastu Compliant'
    ];

    const count = Math.floor(Math.random() * 6) + 3; // 3-8 amenities
    return allAmenities.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  private getPropertyImages(item: any): string[] {
    const defaultImages = [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg'
    ];

    if (item.primary_photo?.href) {
      return [item.primary_photo.href, ...defaultImages.slice(1)];
    }

    return defaultImages;
  }

  private async getMockProperties(filters?: any): Promise<{ properties: Property[]; total: number }> {
    await this.delay(800);
    let filteredProperties = [...this.mockProperties];

    if (filters) {
      if (filters.location) {
        filteredProperties = filteredProperties.filter(p =>
          p.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => p.bedrooms === filters.bedrooms);
      }
      if (filters.featured !== undefined) {
        filteredProperties = filteredProperties.filter(p => p.featured === filters.featured);
      }
    }

    const offset = filters?.offset || 0;
    const limit = filters?.limit || 10;
    const paginatedProperties = filteredProperties.slice(offset, offset + limit);

    return {
      properties: paginatedProperties,
      total: filteredProperties.length
    };
  }
}

export const propertyApi = new PropertyApiService();