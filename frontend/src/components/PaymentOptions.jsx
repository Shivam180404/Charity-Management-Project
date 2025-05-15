import React, { useState } from 'react';

const paymentModes = [
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: '💸', 
    description: 'Pay using UPI apps like Google Pay, PhonePe, etc.',
    upiId: '7061941488@naviaxis'
  },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay using your credit or debit card' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'Pay directly from your bank account' },
  { id: 'wallet', name: 'Digital Wallet', icon: '📱', description: 'Pay using digital wallets like Paytm, Amazon Pay, etc.' }
];

const PaymentOptions = ({ onPaymentSelect, onCancel }) => {
  const [selectedMode, setSelectedMode] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePaymentSelect = (modeId) => {
    setSelectedMode(modeId);
    if (modeId === 'upi') {
      // For UPI, we'll show the UPI ID and let user copy it
      return;
    }
    onPaymentSelect(modeId);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(paymentModes.find(mode => mode.id === 'upi').upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Select Payment Method</h2>
          
          <div className="space-y-4">
            {paymentModes.map((mode) => (
              <div key={mode.id}>
                <button
                  onClick={() => handlePaymentSelect(mode.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedMode === mode.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{mode.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{mode.name}</h3>
                      <p className="text-sm text-gray-600">{mode.description}</p>
                    </div>
                  </div>
                </button>

                {selectedMode === 'upi' && mode.id === 'upi' && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">UPI ID:</p>
                        <p className="text-lg font-semibold text-purple-600">{mode.upiId}</p>
                      </div>
                      <button
                        onClick={copyUpiId}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Please use this UPI ID to make the payment. After payment, click the button below to confirm.
                    </p>
                    <button
                      onClick={() => onPaymentSelect('upi')}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                      I've Made the Payment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onCancel}
              className="w-full bg-white text-purple-600 hover:text-purple-700 font-semibold py-3 px-4 rounded-lg border-2 border-purple-600 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions; 