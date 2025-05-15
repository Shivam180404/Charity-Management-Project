import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const UPIPayment = ({ amount, onSuccess }) => {
  const [showQR, setShowQR] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState('');
  const [scannedData, setScannedData] = useState('');
  const upiId = "charity@upi"; // Replace with your actual UPI ID

  const handleCopyUPI = () => {
    try {
      navigator.clipboard.writeText(upiId);
      alert('UPI ID copied to clipboard!');
    } catch (err) {
      setError('Failed to copy UPI ID. Please try again.');
    }
  };

  const validateAmount = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount greater than 0');
      return false;
    }
    setError('');
    return true;
  };

  const handleSuccess = () => {
    if (!validateAmount()) {
      return;
    }
    onSuccess();
  };

  const handleShowQR = () => {
    if (!validateAmount()) {
      return;
    }
    setShowQR(!showQR);
    setShowScanner(false); // Close scanner when showing QR
  };

  const handleScan = (result) => {
    if (result) {
      setScannedData(result.text);
      setShowScanner(false);
      // Here you can process the scanned UPI data
      console.log('Scanned UPI Data:', result.text);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
    setError('Failed to scan QR code. Please try again.');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pay via UPI</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* UPI ID Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">UPI ID</h4>
          <div className="flex items-center justify-between">
            <span className="font-mono text-gray-800">{upiId}</span>
            <button
              onClick={handleCopyUPI}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleShowQR}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {showQR ? 'Hide QR Code' : 'Show QR Code'}
          </button>
          <button
            onClick={() => {
              setShowScanner(!showScanner);
              setShowQR(false); // Hide QR when showing scanner
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {showScanner ? 'Close Scanner' : 'Scan QR Code'}
          </button>
        </div>

        {/* QR Scanner */}
        {showScanner && (
          <div className="mt-4">
            <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
              <QrReader
                onResult={handleScan}
                onError={handleError}
                constraints={{ facingMode: 'environment' }}
                className="w-full h-full"
              />
            </div>
            {scannedData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Scanned Data:</p>
                <p className="font-mono text-sm break-all">{scannedData}</p>
              </div>
            )}
          </div>
        )}

        {/* QR Code Display */}
        {showQR && (
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Replace with your actual QR code image */}
              <img
                src="/qr-code-placeholder.png"
                alt="UPI QR Code"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-600">
              Scan this QR code with any UPI app to pay ₹{amount}
            </p>
          </div>
        )}

        {/* Payment Confirmation Button */}
        <div className="pt-4">
          <button
            onClick={handleSuccess}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            I've Made the Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment; 