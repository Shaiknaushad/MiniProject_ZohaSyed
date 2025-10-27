import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ApiTest from '../components/ApiTest';
import ApiModeToggle from '../components/ApiModeToggle';
import { Property, PropertyFilter as FilterType } from '../types/property';
import { propertyApi } from '../services/propertyApi';
import { useApiMode } from '../contexts/ApiModeContext';

const PropertiesPage: React.FC = () => {
  const { refreshTrigger } = useApiMode();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>({ location: '' });
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const propertiesPerPage = 9;

  useEffect(() => {
    fetchProperties();
  }, [filter, currentPage, sortBy, refreshTrigger]); // Add refreshTrigger to dependencies

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const offset = (currentPage - 1) * propertiesPerPage;
      const response = await propertyApi.getProperties({
        ...filter,
        limit: propertiesPerPage,
        offset: offset
      });
      
      let sortedProperties = [...response.properties];
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          sortedProperties.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedProperties.sort((a, b) => b.price - a.price);
          break;
        case 'size-large':
          sortedProperties.sort((a, b) => b.size - a.size);
          break;
        case 'size-small':
          sortedProperties.sort((a, b) => a.size - b.size);
          break;
        default:
          // Keep original order for 'newest'
          break;
      }
      
      setProperties(sortedProperties);
      setTotalProperties(response.total);
    } catch (err) {
      setError('Failed to fetch properties. Please try again.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Properties in India
          </h1>
          <p className="text-gray-600 mb-6">
            Discover high-quality properties in the best locations across India.
          </p>
          
          {/* API Mode Toggle */}
          <ApiModeToggle />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600">Loading properties...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Properties</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={fetchProperties}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-4">
                  No properties match your search criteria. Please try different filters.
                </p>
                <button
                  onClick={() => {
                    setFilter({ location: '' });
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{properties.length}</span> of{' '}
                    <span className="font-semibold">{totalProperties}</span> properties
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="size-large">Size: Large to Small</option>
                      <option value="size-small">Size: Small to Large</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === page
                              ? 'text-white bg-blue-900 border border-blue-900'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* API Test Panel - Only visible in development */}
        {import.meta.env.DEV && <ApiTest />}
      </div>
    </div>
  );
};

export default PropertiesPage;
