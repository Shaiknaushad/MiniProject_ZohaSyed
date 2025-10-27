import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Property } from '../types/property';
import { propertyApi } from '../services/propertyApi';
import { useApiMode } from '../contexts/ApiModeContext';
import { Building2, MapPin, ThumbsUp, Award, HeartHandshake } from 'lucide-react';

const HomePage: React.FC = () => {
  const { refreshTrigger } = useApiMode();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [latestProperties, setLatestProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomePageData();
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      const [featured, latest] = await Promise.all([
        propertyApi.getFeaturedProperties(4),
        propertyApi.getProperties({ limit: 3, offset: 0 })
      ]);
      
      setFeaturedProperties(featured);
      setLatestProperties(latest.properties);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <FeaturedProperties properties={featuredProperties} />
          )}
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Why Choose Us</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We are committed to providing the best real estate buying and renting experience in India with excellent service and market expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Properties</h3>
              <p className="text-gray-600">
                We select high-quality properties in the best locations across India.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Location</h3>
              <p className="text-gray-600">
                All our projects are in high-potential areas, offering convenience and easy travel.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellent Service</h3>
              <p className="text-gray-600">
                A professional team is ready to consult and assist you through every step of the buying or selling process.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trustworthiness</h3>
              <p className="text-gray-600">
                We are trusted by over 2,000 customers and have more than 10 years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Popular Areas</h2>
            <p className="text-blue-100 mt-4 max-w-2xl mx-auto">
              Discover properties in the best locations across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg" 
                alt="Mumbai" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Mumbai</h3>
                <p className="text-blue-100 mt-1">42 Properties</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg" 
                alt="Delhi" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Delhi</h3>
                <p className="text-blue-100 mt-1">38 Properties</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg" 
                alt="Bangalore" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Bangalore</h3>
                <p className="text-blue-100 mt-1">28 Properties</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg" 
                alt="Goa" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">Goa</h3>
                <p className="text-blue-100 mt-1">18 Properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Latest Properties</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover newly listed properties on the market and seize the opportunity before anyone else.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="flex justify-center col-span-full py-8">
                <LoadingSpinner size="md" />
              </div>
            ) : (
              latestProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/properties" 
              className="inline-block px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
            >
              View All Properties
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Trusted by over 2,000 Customers</h2>
              <p className="text-gray-600 mb-6">
                With over 10 years of experience in the real estate business, we have helped over 2,000 customers find their dream homes. We are proud to be trusted by our clients and are committed to providing the best service.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-xl mb-6">
                <div className="flex items-center text-yellow-500 mb-2">
                  ★★★★★
                </div>
                <p className="text-gray-600 italic">
                  "Excellent service! The professional team helped me every step of the way in buying a luxury apartment in Mumbai, even though I was abroad. Thank you very much!"
                </p>
                <div className="mt-4 flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Rajesh Sharma</p>
                    <p className="text-sm text-gray-500">Customer from USA</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="bg-blue-50 px-4 py-3 rounded-lg flex items-center">
                  <Award className="text-blue-900 mr-2" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Award</p>
                    <p className="font-semibold">Excellent Real Estate 2024</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 px-4 py-3 rounded-lg flex items-center">
                  <ThumbsUp className="text-blue-900 mr-2" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                    <p className="font-semibold">98% of All Customers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg" 
                  alt="Customer Story" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg w-48">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
                      2K+
                    </div>
                    <p className="ml-3 font-semibold">Satisfied Customers</p>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;