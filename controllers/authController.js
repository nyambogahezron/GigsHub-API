const User = require("../models/userModel");
const asyncWrapper = require("../middleware/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

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

	//create a JWT
	const tokenUser = createTokenUser(user);

	attachCookiesToResponse({ res, user: tokenUser });

	user.password = undefined;
	res.status(StatusCodes.CREATED).json({
		msg: "User Created Success",
		user: user
	});
});

// @desc    Login/Auth user & get token
// @endpoint   POST /api/v1/auth/login
// @access  Public

const loginUser =asyncWrapper(async (req, res) => {
		const { email, password } = req.body;

	if (!email || !password) {
		throw new CustomError.BadRequestError('Please provide all field');
	}

	const user = await User.findOne({email })

	if(!user){
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });

});

// @desc    Logout user & destroy token
// @endpoint   POST /api/v1/auth/register
// @access  Public

const logoutUser = (req, res) => {
	res.send("logout");
};

module.exports = { registerUser, loginUser, logoutUser };
