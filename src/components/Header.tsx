import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserActivity } from '../contexts/UserActivityContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { stats } = useUserActivity();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isHomePage && !isScrolled
          ? 'bg-transparent py-5'
          : 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Home 
              size={28} 
              className={`transition-colors ${
                isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'
              }`} 
            />
            <span 
              className={`text-xl font-semibold transition-colors ${
                isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'
              }`}
            >
              Indian Estate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors hover:text-blue-600 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`transition-colors hover:text-blue-600 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors hover:text-blue-600 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors hover:text-blue-600 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
              }`}
            >
              Contact
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors relative ${
                  isHomePage && !isScrolled 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  {user?.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                </span>
                {stats.totalActivities > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stats.totalActivities > 99 ? '99+' : stats.totalActivities}
                  </span>
                )}
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} className="mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X 
                size={24} 
                className={isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'} 
              />
            ) : (
              <Menu 
                size={24} 
                className={isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'} 
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white mt-4 py-4 px-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/profile" 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded text-left w-full"
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;