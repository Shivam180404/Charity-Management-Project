import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [timeSeries, setTimeSeries] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/donations/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data.stats);
        setTimeSeries(response.data.timeSeries);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch donation statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const weeklyChartData = {
    labels: timeSeries.weekly.map(item => item.date),
    datasets: [
      {
        label: 'Daily Donations',
        data: timeSeries.weekly.map(item => item.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const monthlyChartData = {
    labels: timeSeries.monthly.map(item => item.date),
    datasets: [
      {
        label: 'Weekly Donations',
        data: timeSeries.monthly.map(item => item.amount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const yearlyChartData = {
    labels: timeSeries.yearly.map(item => item.date),
    datasets: [
      {
        label: 'Monthly Donations',
        data: timeSeries.yearly.map(item => item.amount),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Donation Trends',
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Weekly Donations</h3>
          <p className="text-3xl font-bold text-blue-600">₹{stats.weekly.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Monthly Donations</h3>
          <p className="text-3xl font-bold text-green-600">₹{stats.monthly.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Yearly Donations</h3>
          <p className="text-3xl font-bold text-purple-600">₹{stats.yearly.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Weekly Donation Trend</h3>
          <Line data={weeklyChartData} options={chartOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Monthly Donation Trend</h3>
          <Bar data={monthlyChartData} options={chartOptions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Yearly Donation Trend</h3>
          <Line data={yearlyChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 