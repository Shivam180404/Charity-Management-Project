import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import DonationForm from './components/DonationForm';
import DonationHistory from './components/DonationHistory';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route
          path="/donate"
          element={isAuthenticated ? <DonationForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-donations"
          element={isAuthenticated ? <DonationHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App; 