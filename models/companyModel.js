const mongoose = require('mongoose');
const validator = require('validator');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please Provide Email'],
      unique: true,
      maxlength: [150, 'Invalid Email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Provide company phone number'],
    },
    website: {
      type: String,
      required: [true, 'Provide company website'],
    },
    logo: {
      type: String,
      default: '/acme',
    },
    location: {
      type: String,
      default: 'my city',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
