const User = require('../models/userModel')
const asyncWrapper = require('../middleware/asyncHandler')

// @desc    Register user & get token
// @endpoint   POST /api/v1/auth/register
// @access  Public

const registerUser = asyncWrapper(async (req, res) => {
	const { name, email, password, role } = req.body;
});

// @desc    Login/Auth user & get token
// @endpoint   POST /api/v1/auth/register
// @access  Public

const loginUser = (req, res) => {
	res.send("loginUser");
};

// @desc    Logout user & destroy token
// @endpoint   POST /api/v1/auth/register
// @access  Public

const logoutUser = (req, res) => {
	res.send("logout");
};

module.exports = {registerUser, loginUser, logoutUser}