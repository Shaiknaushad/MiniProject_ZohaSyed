import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types/property';
import PropertyCard from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProperties, setVisibleProperties] = useState<Property[]>([]);

  // Number of properties to show at different screen sizes
  const getVisibleCount = () => {
    if (window.innerWidth >= 1280) return 3; // xl
    if (window.innerWidth >= 768) return 2; // md
    return 1; // sm and below
  };

  useEffect(() => {
    const handleResize = () => {
      const visibleCount = getVisibleCount();
      updateVisibleProperties(visibleCount);
    };
    handleResize(); // Initialize on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [properties, currentIndex]);

  const updateVisibleProperties = (visibleCount: number) => {
    const featuredProperties = properties.filter(property => property.featured);
    
    if (featuredProperties.length === 0) {
      setVisibleProperties([]);
      return;
    }
    
    const startIndex = currentIndex % featuredProperties.length;

    const visible = [];
    for (let i = 0; i < Math.min(visibleCount, featuredProperties.length); i++) {
      const index = (startIndex + i) % featuredProperties.length;
      visible.push(featuredProperties[index]);
    }

    setVisibleProperties(visible);
  };

  const goToPrev = () => {
    const featuredProperties = properties.filter(property => property.featured);
    if (featuredProperties.length === 0) return;
    setCurrentIndex((currentIndex - 1 + featuredProperties.length) % featuredProperties.length);
  };

  const goToNext = () => {
    const featuredProperties = properties.filter(property => property.featured);
    if (featuredProperties.length === 0) return;
    setCurrentIndex((currentIndex + 1) % featuredProperties.length);
  };

  const featuredProperties = properties.filter(property => property.featured);
  
  if (featuredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">Featured Properties</h2>
        <p className="text-gray-600">No featured properties available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">Featured Properties</h2>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors z-10"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center mt-8">
        {featuredProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors ${
              currentIndex === index ? 'bg-blue-900' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
