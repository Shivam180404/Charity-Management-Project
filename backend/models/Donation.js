const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  charityName: {
    type: String,
    required: true,
    trim: true
  },
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid PIN code!`
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation; 