import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import DonationTracking from './DonationTracking';

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/043/377/277/small_2x/a-young-girl-standing-with-a-yellow-scarf-around-her-neck-photo.jpg"
            alt="Donation Impact"
            className="w-full h-full object-cover"
          />
         
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Every Gift Counts.
            <br />
            Every Heart Matters.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in making a difference. Your contribution, no matter how small, can change lives and bring hope to those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/donate"
                className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors transform hover:scale-105"
              >
                Donate Now
              </Link>
            )}
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Your Donation Helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Immediate Impact</h3>
              <p className="text-gray-600">Your donation reaches those in need quickly, providing essential support when it matters most.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Process</h3>
              <p className="text-gray-600">Track how your donation is used and see the real difference it makes in people's lives.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Building</h3>
              <p className="text-gray-600">Join a community of like-minded individuals working together to create positive change.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Impact 1 */}
            <div className="relative rounded-2xl overflow-hidden h-96">
              <img
                src="https://api.helpareus.com/images/5157912479-20240706T070431115Z-Alpha-20.webp"
                alt="Community Support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Education Support</h3>
                  <p className="text-white/90">Helping children access quality education and learning resources</p>
                </div>
              </div>
            </div>

            {/* Impact 2 */}
            <div className="relative rounded-2xl overflow-hidden h-96">
              <img
                src="https://miro.medium.com/v2/resize:fit:1000/0*lzyNu8ztv9-aJSyn.jpg"
                alt="Food Distribution"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Food Distribution</h3>
                  <p className="text-white/90">Providing nutritious meals to families in need</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Tracking Section */}
      {isAuthenticated && <DonationTracking />}

      {/* Social Links Section */}
      <div className="py-16">
        <SocialLinks />
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our community of donors and help us create lasting change in people's lives.
          </p>
          <Link
            to="/donate"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 inline-block"
          >
            Start Donating
          </Link>
        </div>
      </div>

      {/* Trust & Transparency Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Trust & Transparency</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* How We Help */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUhrIahLZoaWMLzFn8XSBKWT19wHXruX5h_w&s"
                  alt="How We Help"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Help</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Direct support to underprivileged communities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Education and skill development programs
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Healthcare and nutrition initiatives
                  </li>
                </ul>
              </div>
            </div>

            {/* How We Donate */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGeBlODmjwVUMF47IA4F0YDEuj7igdpnVTw&s"
                  alt="How We Donate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Donate</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Regular donation drives and campaigns
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Partnered with verified NGOs
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Direct beneficiary support
                  </li>
                </ul>
              </div>
            </div>

            {/* Where Money Goes */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGtVemjwFfB4K_5Il2ekS5vgvDqyrQvYQVXQ&s"
                  alt="Where Money Goes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Where Money Goes</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    85% directly to beneficiaries
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    10% operational costs
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    5% platform maintenance
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Proof Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
                <div className="text-gray-600">Lives Impacted</div>
              </div>
              <div className="bg-pink-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">₹50L+</div>
                <div className="text-gray-600">Funds Raised</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-pink-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">25+</div>
                <div className="text-gray-600">Partner NGOs</div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                    alt="Success Story"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rahul's Education Journey</h4>
                    <p className="text-sm text-gray-600">Supported through our education program</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Thanks to the support from donors, I was able to complete my education and now work as a software engineer."
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD3OmwXK7xXXVWJZiocRJOasPkHLK27kGGOQ&s"
                    alt="Success Story"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Meera's Healthcare Support</h4>
                    <p className="text-sm text-gray-600">Beneficiary of our healthcare initiative</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The medical support I received helped me recover from a serious illness and get back to work."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Charity Management</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Charity Street, Sector 15
                </p>
                <p className="ml-7">Noida, Uttar Pradesh 201301</p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 1234567890
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@charitymanagement.org
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/donate" className="block text-gray-300 hover:text-white transition-colors">
                  Donate Now
                </Link>
                <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link to="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Charity Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 