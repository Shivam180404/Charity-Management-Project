import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThankYouMessage from './ThankYouMessage';
import PaymentOptions from './PaymentOptions';

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

const DonationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    charityName: '',
    category: '',
    donorName: '',
    address: '',
    pinCode: '',
    paymentMode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    amount: '',
    charityName: '',
    category: '',
    paymentMode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.charityName.trim()) {
      newErrors.charityName = 'Charity name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a donation category';
    }
    if (!formData.donorName.trim()) {
      newErrors.donorName = 'Donor name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.pinCode.match(/^\d{6}$/)) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSelect = (paymentMode) => {
    setFormData({ ...formData, paymentMode });
    handleSubmit(paymentMode);
  };

  const handleSubmit = async (paymentMode) => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/donations',
        { ...formData, paymentMode },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        setDonationDetails({
          amount: formData.amount,
          charityName: formData.charityName,
          category: formData.category,
          paymentMode
        });
        
        setFormData({
          amount: '',
          charityName: '',
          category: '',
          donorName: '',
          address: '',
          pinCode: '',
          paymentMode: ''
        });
        
        setShowThankYou(true);
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setErrors({ submit: 'Failed to create donation. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (showThankYou) {
    return (
      <ThankYouMessage
        donationAmount={donationDetails.amount}
        charityName={donationDetails.charityName}
        category={donationDetails.category}
        paymentMode={donationDetails.paymentMode}
      />
    );
  }

  if (showPaymentOptions) {
    return (
      <PaymentOptions
        onPaymentSelect={handlePaymentSelect}
        onCancel={() => setShowPaymentOptions(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Make a Donation</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              setShowPaymentOptions(true);
            }
          }} className="space-y-6">
            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter amount"
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            {/* Charity Name Field */}
            <div>
              <label htmlFor="charityName" className="block text-sm font-medium text-gray-700 mb-1">
                Charity Name
              </label>
              <input
                type="text"
                id="charityName"
                name="charityName"
                value={formData.charityName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.charityName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter charity name"
              />
              {errors.charityName && <p className="mt-1 text-sm text-red-600">{errors.charityName}</p>}
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Donation Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {donationCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Donor Name Field */}
            <div>
              <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                value={formData.donorName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.donorName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.donorName && <p className="mt-1 text-sm text-red-600">{errors.donorName}</p>}
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* PIN Code Field */}
            <div>
              <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                PIN Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                  errors.pinCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 6-digit PIN code"
                maxLength="6"
              />
              {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
            </div>

            {errors.submit && (
              <div className="text-red-600 text-sm text-center">{errors.submit}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationForm; 