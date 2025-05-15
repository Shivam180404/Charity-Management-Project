const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.user.id;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      return res.status(401).json({ message: 'Not authorized' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get total donations
router.get('/total', auth, async (req, res) => {
  try {
    const total = await Donation.aggregate([
      { $match: { user: req.userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({ total: total[0]?.total || 0 });
  } catch (err) {
    console.error('Error fetching total donations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create donation
router.post('/', auth, async (req, res) => {
  try {
    const { amount, charityName, donorName, address, pinCode } = req.body;
    
    // Validate input
    if (!amount || !charityName || !donorName || !address || !pinCode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!/^\d{6}$/.test(pinCode)) {
      return res.status(400).json({ message: 'Invalid PIN code' });
    }

    const donation = new Donation({
      user: req.userId,
      amount: parseFloat(amount),
      charityName: charityName.trim(),
      donorName: donorName.trim(),
      address: address.trim(),
      pinCode: pinCode.trim()
    });
    
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error('Donation creation error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.userId })
      .sort({ date: -1 })
      .select('-__v');
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update donation
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, charityName } = req.body;
    
    // Validate input
    if (amount && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const donation = await Donation.findOne({ _id: req.params.id, user: req.userId });
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (amount) donation.amount = parseFloat(amount);
    if (charityName) donation.charityName = charityName.trim();
    
    await donation.save();
    res.json(donation);
  } catch (err) {
    console.error('Error updating donation:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete donation
router.delete('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findOneAndDelete({ _id: req.params.id, user: req.userId });
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json({ message: 'Donation deleted successfully' });
  } catch (err) {
    console.error('Error deleting donation:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donation statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const now = new Date();
    
    // Calculate date ranges
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Get total donations for each period
    const weeklyTotal = await Donation.aggregate([
      { $match: { date: { $gte: oneWeekAgo } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyTotal = await Donation.aggregate([
      { $match: { date: { $gte: oneMonthAgo } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const yearlyTotal = await Donation.aggregate([
      { $match: { date: { $gte: oneYearAgo } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Get time series data
    const weeklyData = await Donation.aggregate([
      { $match: { date: { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const monthlyData = await Donation.aggregate([
      { $match: { date: { $gte: oneMonthAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const yearlyData = await Donation.aggregate([
      { $match: { date: { $gte: oneYearAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      stats: {
        weekly: weeklyTotal[0]?.total || 0,
        monthly: monthlyTotal[0]?.total || 0,
        yearly: yearlyTotal[0]?.total || 0
      },
      timeSeries: {
        weekly: weeklyData.map(item => ({ date: item._id, amount: item.amount })),
        monthly: monthlyData.map(item => ({ date: item._id, amount: item.amount })),
        yearly: yearlyData.map(item => ({ date: item._id, amount: item.amount }))
      }
    });
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    res.status(500).json({ message: 'Error fetching donation statistics' });
  }
});

module.exports = router; 