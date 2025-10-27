import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Eye, Phone, Heart, Share2 } from 'lucide-react';
import { Property } from '../types/property';
import { formatPrice, formatArea } from '../utils/formatters';
import { useUserActivity } from '../contexts/UserActivityContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addActivity, toggleFavorite, isFavorited } = useUserActivity();
  const [showContactModal, setShowContactModal] = useState(false);
  const isPropertyFavorited = isFavorited(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id, property.title, property.location, property.price);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContactModal(true);
    
    // Track contact activity
    addActivity({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyPrice: property.price,
      activityType: 'contacted'
    });
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Track share activity
    addActivity({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyPrice: property.price,
      activityType: 'shared'
    });
    
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: window.location.origin + `/property/${property.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/property/${property.id}`);
      alert('Property link copied to clipboard!');
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isPropertyFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            title="Add to Favorites"
          >
            <Heart size={16} fill={isPropertyFavorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Share Property"
          >
            <Share2 size={16} />
          </button>
        </div>
      <div className="relative">
        {/* Main image */}
        <div className="h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Featured badge */}
        {property.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Price tag */}
        <div className="absolute bottom-4 right-4 bg-blue-900/90 text-white font-bold px-4 py-2 rounded-lg">
          {formatPrice(property.price)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={18} className="text-blue-900" />
          <span className="ml-1 text-sm">{property.location}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm mb-4">
            <div className="flex items-center">
              <Bed size={18} className="text-gray-500" />
              <span className="ml-1">{property.bedrooms} Bedrooms</span>
            </div>

            <div className="flex items-center">
              <Bath size={18} className="text-gray-500" />
              <span className="ml-1">{property.bathrooms} Bathrooms</span>
            </div>

            <div className="flex items-center">
              <Square size={18} className="text-gray-500" />
              <span className="ml-1">{formatArea(property.size)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <Link
              to={`/property/${property.id}`}
              onClick={() => {
                // Track property view
                addActivity({
                  propertyId: property.id,
                  propertyTitle: property.title,
                  propertyLocation: property.location,
                  propertyPrice: property.price,
                  activityType: 'viewed'
                });
              }}
              className="flex-1 bg-blue-900 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center text-sm font-medium"
            >
              <Eye size={16} className="mr-2" />
              Inspect Property
            </Link>
            <button
              onClick={handleContactClick}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-sm font-medium"
            >
              <Phone size={16} className="mr-2" />
              Contact Agent
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Contact Property Agent</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900">{property.title}</h4>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-lg font-semibold text-blue-900 mt-1">{formatPrice(property.price)}</p>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Arjun Sharma</p>
                    <p className="text-sm text-gray-600">Senior Property Consultant</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-500 mr-2" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="text-gray-500 mr-2" />
                    <span>Licensed Agent • 5+ years experience</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    window.open('tel:+919876543210', '_self');
                    setShowContactModal(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Phone size={16} className="mr-2" />
                  Call Now
                </button>
                <button
                  onClick={() => {
                    window.open(`https://wa.me/919876543210?text=Hi, I'm interested in ${property.title} at ${property.location}`, '_blank');
                    setShowContactModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  💬 WhatsApp
                </button>
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
