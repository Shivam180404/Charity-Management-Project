import React from 'react';
import { Link } from 'react-router-dom';

const donationCategories = [
  { id: 'food', name: 'Food Donation', emoji: '🍱' },
  { id: 'clothing', name: 'Clothing Donation', emoji: '👕' },
  { id: 'cancer', name: 'Cancer Patient Support', emoji: '🎗️' },
  { id: 'shelter', name: 'Shelter Support', emoji: '🏠' },
  { id: 'education', name: 'Education Aid', emoji: '📚' },
  { id: 'medical', name: 'Medical Supplies', emoji: '💊' },
  { id: 'hygiene', name: 'Hygiene Kits', emoji: '🧼' },
  { id: 'festival', name: 'Festival Hampers', emoji: '🎁' },
  { id: 'technology', name: 'Technology for Students', emoji: '💻' },
  { id: 'childcare', name: 'Child Care Essentials', emoji: '🍼' }
];

const paymentModes = [
  { id: 'upi', name: 'UPI', icon: '💸' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Digital Wallet', icon: '📱' }
];

const ThankYouMessage = ({ donationAmount, charityName, category, paymentMode }) => {
  const categoryInfo = donationCategories.find(cat => cat.id === category);
  const paymentInfo = paymentModes.find(mode => mode.id === paymentMode);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          
          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <p className="text-lg text-gray-600">
              Your donation of <span className="font-semibold text-purple-600">₹{donationAmount}</span> to{' '}
              <span className="font-semibold text-purple-600">{charityName}</span> has been received.
            </p>
            {categoryInfo && (
              <div className="mt-3 flex items-center justify-center space-x-2">
                <span className="text-2xl">{categoryInfo.emoji}</span>
                <span className="text-gray-700 font-medium">{categoryInfo.name}</span>
              </div>
            )}
            {paymentInfo && (
              <div className="mt-3 flex items-center justify-center space-x-2">
                <span className="text-2xl">{paymentInfo.icon}</span>
                <span className="text-gray-700 font-medium">Paid via {paymentInfo.name}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 mb-8">
            Your generosity will help make a real difference in people's lives. We'll keep you updated on the impact of your donation.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/my-donations"
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Donations
            </Link>
            
            <Link
              to="/"
              className="block w-full bg-white text-purple-600 hover:text-purple-700 font-semibold py-3 px-6 rounded-lg border-2 border-purple-600 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage; 