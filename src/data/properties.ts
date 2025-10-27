import { Property } from '../types/property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Sky Residence',
    location: 'Bandra West, Mumbai',
    price: 125000000,
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Experience the pinnacle of luxury living in this spectacular sky residence. Floor-to-ceiling windows offer breathtaking panoramic views of Mumbai\'s skyline and Arabian Sea. The modern open-concept design features premium finishes including Italian marble countertops, teak wood floors, and smart home technology throughout.',
    amenities: [
      'Infinity Pool',
      'Fitness Center',
      'Rooftop Garden',
      'Private Parking',
      '24/7 Security',
      'Smart Home System'
    ],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg'
    ],
    featured: true,
    coordinates: {
      lat: 19.0596,
      lng: 72.8295
    }
  },
  {
    id: '2',
    title: 'Riverside Oasis',
    location: 'Yamuna Expressway, Delhi',
    price: 180000000,
    size: 180,
    bedrooms: 3,
    bathrooms: 3,
    description: 'Stunning riverside condominium with unobstructed views of the Yamuna River. This spacious residence features premium imported materials, private balconies, and access to world-class amenities. Walking distance to fine dining, shopping malls, and metro connectivity.',
    amenities: [
      'Private Pier',
      'Infinity Edge Pool',
      'Sky Lounge',
      'Concierge Service',
      'Tennis Court',
      'Children\'s Playground'
    ],
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg'
    ],
    featured: true,
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    }
  },
  {
    id: '3',
    title: 'The Emerald Residence',
    location: 'Connaught Place, Delhi',
    price: 150000000,
    size: 145,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Prestigious address in the heart of Delhi\'s business district. This modern luxury condominium offers a perfect blend of convenience and sophistication. Features include a gourmet kitchen, spa-inspired bathrooms, and a private terrace with city views.',
    amenities: [
      'Saltwater Pool',
      'Sauna & Steam Room',
      'Business Center',
      'Sky Garden',
      'Electric Vehicle Charging',
      'Wine Cellar'
    ],
    images: [
      'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg',
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    ],
    featured: false,
    coordinates: {
      lat: 28.6315,
      lng: 77.2167
    }
  },
  {
    id: '4',
    title: 'Beachfront Paradise',
    location: 'Candolim, Goa',
    price: 95000000,
    size: 110,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Wake up to breathtaking Arabian Sea views in this beachfront condominium. Direct beach access and resort-style amenities make this the perfect vacation home or investment property. Recently renovated with high-end fixtures and furnishings.',
    amenities: [
      'Direct Beach Access',
      'Beachfront Pool',
      'Spa & Wellness Center',
      'Poolside Bar',
      'Water Sports Equipment',
      'Tropical Gardens'
    ],
    images: [
      'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg',
      'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'
    ],
    featured: true,
    coordinates: {
      lat: 15.5166,
      lng: 73.7615
    }
  },
  {
    id: '5',
    title: 'Mountain View Retreat',
    location: 'Shimla, Himachal Pradesh',
    price: 75000000,
    size: 135,
    bedrooms: 3,
    bathrooms: 2,
    description: 'Escape to this tranquil mountain retreat in the hills of Shimla. Surrounded by lush greenery and offering spectacular Himalayan views, this condominium combines traditional Indian elements with modern luxury. Perfect for those seeking peace and natural beauty.',
    amenities: [
      'Infinity Edge Pool',
      'Organic Garden',
      'Yoga Pavilion',
      'Hiking Trails',
      'Outdoor Dining Area',
      'Meditation Space'
    ],
    images: [
      'https://images.pexels.com/photos/2480608/pexels-photo-2480608.jpeg',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    featured: false,
    coordinates: {
      lat: 31.1048,
      lng: 77.1734
    }
  },
  {
    id: '6',
    title: 'The Palm Residence',
    location: 'Kovalam, Kerala',
    price: 85000000,
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Elegant beachside living in this exclusive Palm Residence condominium. Just steps from the pristine beaches of Kovalam, this property offers the perfect blend of luxury and relaxation. Featuring high ceilings, an open floor plan, and a spacious balcony for enjoying the sea breeze.',
    amenities: [
      'Beachfront Access',
      'Tropical Pool',
      'Tennis Courts',
      'Clubhouse',
      'Fitness Center',
      'Children\'s Play Area'
    ],
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
      'https://images.pexels.com/photos/2029698/pexels-photo-2029698.jpeg'
    ],
    featured: false,
    coordinates: {
      lat: 8.4004,
      lng: 76.9784
    }
  },
  {
    id: '7',
    title: 'Urban Loft',
    location: 'Koramangala, Bangalore',
    price: 110000000,
    size: 130,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Trendy urban loft in the hip Koramangala district. This stylish condominium features industrial design elements with luxurious finishes. Walking distance to Bangalore\'s best restaurants, cafes, and nightlife. Ideal for young professionals and tech entrepreneurs.',
    amenities: [
      'Rooftop Pool',
      'Co-Working Space',
      'Pet-Friendly',
      'Smart Home Features',
      'Bike Storage',
      'Entertainment Room'
    ],
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg'
    ],
    featured: false,
    coordinates: {
      lat: 12.9352,
      lng: 77.6245
    }
  },
  {
    id: '8',
    title: 'Heritage Palace Villa',
    location: 'Udaipur, Rajasthan',
    price: 200000000,
    size: 200,
    bedrooms: 3,
    bathrooms: 3,
    description: 'Experience royal luxury in this magnificent Udaipur villa. Nestled near Lake Pichola with spectacular palace views, this property offers privacy and grandeur while being minutes from the City Palace and cultural attractions. Features include a private courtyard, traditional Rajasthani architecture, and modern amenities.',
    amenities: [
      'Private Courtyard Pool',
      'Lake View Terrace',
      'Traditional Kitchen',
      'Heritage Tours',
      'Housekeeping Service',
      'Rajasthani Gardens'
    ],
    images: [
      'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
      'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg'
    ],
    featured: true,
    coordinates: {
      lat: 24.5854,
      lng: 73.7125
    }
  }
];