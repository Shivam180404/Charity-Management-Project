const Donation = require('../models/Donation');

// @desc Create a new donation
// @route POST /api/donations
// @access Private
const createDonation = async (req, res) => {
  try {
    const { amount, charityName } = req.body;
    const donation = await Donation.create({
      user: req.user._id,
      amount,
      charityName,
    });
    res.status(201).json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc Get logged in user donations
// @route GET /api/donations/my
// @access Private
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc Update donation
// @route PUT /api/donations/:id
// @access Private
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc Delete donation
// @route DELETE /api/donations/:id
// @access Private
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Donation.deleteOne({ _id: donation._id });
    res.json({ message: 'Donation removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createDonation,
  getMyDonations,
  updateDonation,
  deleteDonation,
}; 