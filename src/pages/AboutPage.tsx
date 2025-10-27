import React from 'react';
import { Users, Award, Target, Heart, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Indian Estate Portal</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Your trusted partner in finding the perfect property across India. With over a decade of experience,
              we've helped thousands of families find their dream homes in the most prestigious locations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2013, Indian Estate Portal began with a simple vision: to revolutionize the real estate
                experience in India by combining traditional values with modern technology. What started as a small
                team in Mumbai has grown into one of India's most trusted real estate platforms.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We understand that buying or selling a property is one of life's most significant decisions. That's
                why we've built our reputation on transparency, integrity, and exceptional customer service. Our team
                of experienced professionals is dedicated to making your real estate journey smooth and successful.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we proudly serve clients across major Indian cities including Mumbai, Delhi, Bangalore,
                Chennai, Hyderabad, Pune, and many more, offering a diverse portfolio of residential and commercial properties.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Our Team"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Target className="text-blue-900 mr-4" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional real estate services that exceed our clients' expectations while maintaining
                the highest standards of professionalism, integrity, and innovation. We strive to make property
                transactions seamless, transparent, and rewarding for everyone involved.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Heart className="text-blue-900 mr-4" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be India's most trusted and innovative real estate platform, empowering millions of people to
                find their perfect homes and make informed property investment decisions. We envision a future where
                real estate transactions are simple, transparent, and accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape our relationships with clients, partners, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct business with honesty, transparency, and ethical practices in every interaction.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Our clients' needs and satisfaction are at the heart of everything we do.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in service delivery and continuously improve our processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2000+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-blue-100">Properties Sold</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <p className="text-blue-100">Cities Covered</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-blue-100">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind Indian Estate Portal.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">ZS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Zoha Syed</h3>
                <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">VK</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vaishnavi K A</h3>
                <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">VH</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Vijayashree Hugar</h3>
                <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">This is the Last Thing</h3>
                <p className="text-gray-700 text-lg">
                  Together, we've built Indian Estate Portal to serve you better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;