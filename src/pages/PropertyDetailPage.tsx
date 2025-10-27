import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Building,
  DollarSign,
  Star,
  Check,
  Share2,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Property } from '../types/property';
import { propertyApi } from '../services/propertyApi';
import { formatPrice, formatArea } from '../utils/formatters';
import ImageGallery from '../components/ImageGallery';
import ContactForm from '../components/ContactForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUserActivity } from '../contexts/UserActivityContext';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addActivity } = useUserActivity();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const foundProperty = await propertyApi.getPropertyById(propertyId);
      setProperty(foundProperty);
      
      // Track property view when detail page loads
      if (foundProperty) {
        addActivity({
          propertyId: foundProperty.id,
          propertyTitle: foundProperty.title,
          propertyLocation: foundProperty.location,
          propertyPrice: foundProperty.price,
          activityType: 'viewed'
        });
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you are looking for does not exist.</p>
          <a
            href="/properties"
            className="px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            Back to Properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-2xl md:text-3xl font-bold text-blue-900">
                {formatPrice(property.price)}
              </div>

              <div className="flex items-center mt-2">
                <button className="mr-3 flex items-center text-gray-600 hover:text-gray-900">
                  <Star size={18} className="mr-1" />
                  <span>Save</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <Share2 size={18} className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ImageGallery images={property.images} />

            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Bed size={20} className="text-blue-900 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-medium">{property.bedrooms}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Bath size={20} className="text-blue-900 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-medium">{property.bathrooms}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Square size={20} className="text-blue-900 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-medium">{formatArea(property.size)}</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                {property.description}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                {/* In a real application, this would be an actual map component */}
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <div className="text-center">
                    <MapPin size={40} className="text-blue-900 mx-auto mb-2" />
                    <p className="font-medium text-gray-800">{property.location}</p>
                    <p className="text-sm text-gray-600">Map will be displayed here</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nearby Places</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building size={16} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium">Shopping Mall</p>
                    <p className="text-sm text-gray-600">300 meters</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building size={16} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium">Metro Station</p>
                    <p className="text-sm text-gray-600">500 meters</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building size={16} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium">Hospital</p>
                    <p className="text-sm text-gray-600">1.2 kilometers</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building size={16} className="text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium">Public Park</p>
                    <p className="text-sm text-gray-600">800 meters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Contact Agent Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Property Agent</h3>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Arjun Sharma</h4>
                  <p className="text-sm text-gray-600">Senior Property Consultant</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500 ml-1">(4.9/5)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">5+ Years</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Properties Sold</p>
                    <p className="font-medium">200+</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Languages</p>
                    <p className="font-medium">Hindi, English</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Response Time</p>
                    <p className="font-medium">&lt; 30 mins</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    addActivity({
                      propertyId: property.id,
                      propertyTitle: property.title,
                      propertyLocation: property.location,
                      propertyPrice: property.price,
                      activityType: 'contacted'
                    });
                    window.open('tel:+919876543210', '_self');
                  }}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                >
                  <Phone size={18} className="mr-2" />
                  Call Now: +91 98765 43210
                </button>
                
                <button
                  onClick={() => {
                    addActivity({
                      propertyId: property.id,
                      propertyTitle: property.title,
                      propertyLocation: property.location,
                      propertyPrice: property.price,
                      activityType: 'contacted'
                    });
                    window.open(`https://wa.me/919876543210?text=Hi, I'm interested in ${property.title} at ${property.location}. Price: ${formatPrice(property.price)}`, '_blank');
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                >
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp Chat
                </button>

                <button
                  onClick={() => {
                    addActivity({
                      propertyId: property.id,
                      propertyTitle: property.title,
                      propertyLocation: property.location,
                      propertyPrice: property.price,
                      activityType: 'contacted'
                    });
                    setShowContactModal(true);
                  }}
                  className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center font-medium"
                >
                  📧 Send Email Inquiry
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 <strong>Pro Tip:</strong> Mention you found this property on Indian Estate Portal for priority service!
                </p>
              </div>
            </div>

            <ContactForm propertyTitle={property.title} />

            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type</span>
                  <span className="font-medium">Condominium</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-600">Year Completed</span>
                  <span className="font-medium">2023</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-600">Number of Floors</span>
                  <span className="font-medium">32 floors</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-600">Number of Units</span>
                  <span className="font-medium">350 units</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-600">Common Fee</span>
                  <span className="font-medium">50 THB/sq.m./month</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-600">Sinking Fund</span>
                  <span className="font-medium">500 THB/sq.m.</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-100">
              <div className="flex items-center mb-4">
                <DollarSign size={24} className="text-blue-900 mr-2" />
                <h3 className="text-lg font-semibold">Preliminary Loan Calculation</h3>
              </div>

              <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Price</span>
                  <span className="font-medium">{formatPrice(property.price)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">20% Down Payment</span>
                  <span className="font-medium">{formatPrice(property.price * 0.2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">{formatPrice(property.price * 0.8)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Installment (30 years)</span>
                  <span className="font-medium text-blue-900">{formatPrice((property.price * 0.8) / 360)}/month</span>
                </div>
              </div>

              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors">
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Send Email Inquiry</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">{property.title}</h4>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-lg font-semibold text-blue-900 mt-1">{formatPrice(property.price)}</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Schedule Property Visit</option>
                  <option>Request Price Details</option>
                  <option>Loan Assistance</option>
                  <option>General Information</option>
                  <option>Investment Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="I'm interested in this property. Please provide more details about..."
                  defaultValue={`I'm interested in ${property.title} located at ${property.location}. Please provide more information about the property and schedule a visit.`}
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Send Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Quick Response Guaranteed:</strong> Our agent will respond within 30 minutes during business hours (9 AM - 7 PM).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
