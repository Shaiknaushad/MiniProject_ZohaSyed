import React from 'react';
import { MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Find Your Dream Home<br />in India
          </h1>

          <p className="text-xl text-white/90 mb-8">
            Quality residences in the best locations across India are ready for you to own today.
          </p>

          {/* Popular Locations */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl border border-white/20">
            <div className="flex items-center mb-4">
              <MapPin size={24} className="text-white mr-3" />
              <h3 className="text-xl font-semibold text-white">Explore Prime Locations</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-white mb-1">Mumbai</div>
                <div className="text-white/80 text-sm">Financial Capital</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-white mb-1">Delhi</div>
                <div className="text-white/80 text-sm">National Capital</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-white mb-1">Bangalore</div>
                <div className="text-white/80 text-sm">Silicon Valley</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-white mb-1">Goa</div>
                <div className="text-white/80 text-sm">Beach Paradise</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <div className="text-2xl font-bold text-white mb-1">Pune</div>
                <div className="text-white/80 text-sm">IT Hub</div>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-12">
            <div className="flex -space-x-2">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div className="ml-4">
              <div className="text-yellow-400 flex">
                ★★★★★ <span className="text-white ml-1">4.9/5</span>
              </div>
              <p className="text-white text-sm">from over 2,000+ customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#F9FAFB"
            fillOpacity="1"
            d="M0,64L80,64C160,64,320,64,480,53.3C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;


