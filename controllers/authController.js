const User = require("../models/userModel");
const asyncWrapper = require("../middleware/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// @desc    Register user & get token
// @endpoint   POST /api/v1/auth/register
// @access  Public

const registerUser = asyncWrapper(async (req, res) => {
	const { name, email, password, role } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError("Email already exists !");
	}
	const user = await User.create({
		name,
		email,
		password,
		role,
	});
	res.status(StatusCodes.CREATED).json({
		msg: "User Created Success, Please check Email to verify",
	});
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

module.exports = { registerUser, loginUser, logoutUser };
