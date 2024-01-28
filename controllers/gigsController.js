const User = require("../models/userModel");
const asyncWrapper = require("../middleware/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

// @desc Create Gig
// @endpoint   POST /api/v1/gigs/create
// @access  Protected

const createGig = asyncWrapper(async (req, res) => {
	res.send("createGig");
});


// @desc Upate Gig
// @endpoint   PATCH /api/v1/gigs/upate/:id
// @access  Protected

const updateGig = asyncWrapper(async (req, res) => {
	res.send("updateGig");
});


// @desc  delete Gig
// @endpoint   DELETE /api/v1/gigs/delete/:id
// @access  Protected

const updateGig = asyncWrapper(async (req, res) => {
	res.send("updateGig");
});



// @desc  get all Gig
// @endpoint   GET /api/v1/gigs
// @access  Public

const getAllGigs = asyncWrapper(async (req, res) => {
	res.send("getAllGigs");
});



// @desc  get single Gig
// @endpoint   GET /api/v1/gigs/:id
// @access  Public

const getSingleGig = asyncWrapper(async (req, res) => {
	res.send("getAllGig");
});