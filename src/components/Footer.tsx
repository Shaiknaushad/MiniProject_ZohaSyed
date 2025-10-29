import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Propertia AI</h3>
            <p className="text-gray-400 mb-4">
              India's leading real estate company, committed to creating quality homes with excellent service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?location=Mumbai" className="text-gray-400 hover:text-white transition-colors">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Delhi" className="text-gray-400 hover:text-white transition-colors">
                  Delhi
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Bangalore" className="text-gray-400 hover:text-white transition-colors">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Goa" className="text-gray-400 hover:text-white transition-colors">
                  Goa
                </Link>
              </li>
              <li>
                <Link to="/properties?location=Pune" className="text-gray-400 hover:text-white transition-colors">
                  Pune
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={20} className="mr-2 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">
                  Tower A, 15th Floor, Bandra Kurla Complex, Mumbai 400051
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-2 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-2 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">info@propertiaai.com</span>
              </li>
              <li className="flex">
                <Clock size={20} className="mr-2 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Propertia AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
