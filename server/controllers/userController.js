const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { validateSignup, validateSignin } = require("../validator");
const logger = require("../logger/logger");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const { error, value } = validateSignup(req.body);

  // JOI
  if (error) {
    logger.info(error);
    return res.status(403).send(error.details); // returns error array from JOI
  }
  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    // don't re-register user again if it already exists
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password with bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  if (user) {
    // if user is created
    res.status(201).json({
      _id: user.id,
      name: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user (signin)
// @route   POST /api/users/signin
// @access  Public
const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error, value } = validateSignin(req.body);

  //// JOI
  if (error) {
    logger.info(error);
    return res.status(403).send(error.details); // returns error array from JOI
  }

  // check for user email
  const user = await User.findOne({ email });

  // check if email and entered (hashed) passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json(req.user);
});

// Generate JWT token -> access token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // expires in 30 days. TODO: need to periodically refresh token for solving security vulnerability
  });
};

module.exports = {
  registerUser,
  signinUser,
  getMe,
  generateToken,
};
