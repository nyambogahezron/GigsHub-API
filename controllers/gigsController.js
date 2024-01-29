const Job = require('../models/jobModel');
const asyncWrapper = require('../middleware/asyncHandler');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

// @desc Create Gig
// @endpoint   POST /api/v1/gigs/create
// @access  Protected

const createGig = asyncWrapper(async (req, res) => {
  const user = req.user.userId;

  const gig = await Job.create({ ...req.body, createdBy: user });

  if (!gig) {
    throw new CustomError.BadRequestError('Something went wrong , try again');
  }
  const tags = gig.tags.split(', ')
  
  res.status(StatusCodes.CREATED).json({
    msg: 'Gig created Successful',
    gig: gig,
  });
});

// @desc Update Gig
// @endpoint   PATCH /api/v1/gigs/update/:id
// @access  Protected

const updateGig = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new CustomError.BadRequestError('Invalid Details');
  }

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Gig Updated Successful', gig: job });
});

// @desc  delete Gig
// @endpoint   DELETE /api/v1/gigs/delete/:id
// @access  Protected

const deleteGig = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new CustomError.BadRequestError('Invalid Details');
  }

  res.status(StatusCodes.OK).json({ msg: 'Gig Deleted Successful' });
});

// @desc  get all Gig
// @endpoint   GET /api/v1/gigs
// @access  Public

const getAllGigs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({}).sort('createdAt');
  if (!jobs) {
    throw new CustomError.BadRequestError('No job available');
  }

  res.status(StatusCodes.OK).json({ gigs: jobs });
});

// @desc  get single Gig
// @endpoint   GET /api/v1/gigs/:id
// @access  Public

const getSingleGig = asyncWrapper(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  if (!job) {
    throw new CustomError.BadRequestError('No job available');
  }

  res.status(StatusCodes.OK).json({ gig: job });
});

// @desc  get user Gig
// @endpoint   GET /api/v1/userGigs
// @access  Protected

const getUserGigs = asyncWrapper(async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId });
  if (!job) {
    throw new CustomError.BadRequestError('No job available for this user');
  }

  res.status(StatusCodes.OK).json({ userGigs: job });
});

module.exports = {
  createGig,
  updateGig,
  deleteGig,
  getAllGigs,
  getSingleGig,
  getUserGigs,
};
