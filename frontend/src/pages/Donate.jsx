import React from 'react';
import DonationForm from '../components/DonationForm';

const Donate = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Make a Donation</h1>
      <DonationForm />
    </div>
  );
};

export default Donate; 