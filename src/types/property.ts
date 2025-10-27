export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type PropertyFilter = {
  location: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  bedrooms?: number;
  bathrooms?: number;
};