import React from 'react';
import DonationHistory from '../components/DonationHistory';
import DonationForm from '../components/DonationForm';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Donor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Make a New Donation</h2>
          <DonationForm />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Donation History</h2>
          <DonationHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 