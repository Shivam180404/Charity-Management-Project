import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DonationTracking = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeSeries, setTimeSeries] = useState({
    weekly: [],
    monthly: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/donations/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data) {
          setStats(response.data.stats);
          setTimeSeries({
            weekly: response.data.timeSeries?.weekly || [],
            monthly: response.data.timeSeries?.monthly || []
          });
        }
      } catch (err) {
        if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to fetch donation statistics');
          console.error('Error fetching stats:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Donation Tracking</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-purple-600 mb-2">Weekly</div>
            <div className="text-3xl font-bold text-gray-900">{formatAmount(stats.weekly)}</div>
            <div className="text-sm text-gray-500 mt-2">This Week's Donations</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-purple-600 mb-2">Monthly</div>
            <div className="text-3xl font-bold text-gray-900">{formatAmount(stats.monthly)}</div>
            <div className="text-sm text-gray-500 mt-2">This Month's Donations</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold text-purple-600 mb-2">Yearly</div>
            <div className="text-3xl font-bold text-gray-900">{formatAmount(stats.yearly)}</div>
            <div className="text-sm text-gray-500 mt-2">This Year's Donations</div>
          </div>
        </div>

        {/* Time Series Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Weekly Donations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Weekly Trend</h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <div className="flex flex-col h-full justify-end">
                  {timeSeries.weekly?.length > 0 ? (
                    timeSeries.weekly.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div className="w-24 text-sm text-gray-600">{item.date}</div>
                        <div className="flex-1 bg-pink-100 rounded-full h-4">
                          <div 
                            className="bg-pink-600 rounded-full h-4" 
                            style={{ width: `${(item.amount / Math.max(...timeSeries.weekly.map(d => d.amount))) * 100}%` }}
                          />
                        </div>
                        <div className="w-20 text-right text-sm font-medium">{formatAmount(item.amount)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No weekly data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Monthly Donations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">Monthly Trend</h3>
            </div>
            <div className="p-6">
              <div className="h-64">
                <div className="flex flex-col h-full justify-end">
                  {timeSeries.monthly?.length > 0 ? (
                    timeSeries.monthly.map((item, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div className="w-24 text-sm text-gray-600">{item.date}</div>
                        <div className="flex-1 bg-purple-100 rounded-full h-4">
                          <div 
                            className="bg-purple-600 rounded-full h-4" 
                            style={{ width: `${(item.amount / Math.max(...timeSeries.monthly.map(d => d.amount))) * 100}%` }}
                          />
                        </div>
                        <div className="w-20 text-right text-sm font-medium">{formatAmount(item.amount)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No monthly data available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationTracking; 