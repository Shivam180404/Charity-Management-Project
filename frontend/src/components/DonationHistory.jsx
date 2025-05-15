import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalDonations, setTotalDonations] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchDonations = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch user's donations
      const donationsResponse = await axios.get('http://localhost:5000/api/donations/my-donations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch total donations
      const totalResponse = await axios.get('http://localhost:5000/api/donations/total', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDonations(donationsResponse.data);
      setTotalDonations(totalResponse.data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch donations');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDonations();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Total Donations</h2>
              <div className="text-4xl font-bold text-purple-600">
                {formatAmount(totalDonations)}
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Refreshing...
                </div>
              ) : (
                'Refresh'
              )}
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Donation History</h2>
        <div className="grid gap-6">
          {donations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{donation.charityName}</h3>
                  <p className="text-gray-600">{formatDate(donation.date)}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-600">{formatAmount(donation.amount)}</div>
                  <div className="text-sm text-gray-500">{donation.category}</div>
                </div>
              </div>
              {donation.message && (
                <p className="mt-4 text-gray-600 italic">"{donation.message}"</p>
              )}
            </div>
          ))}
        </div>

        {donations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No donations found. Start making a difference today!</p>
            <button
              onClick={() => navigate('/donate')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Donate Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory; 