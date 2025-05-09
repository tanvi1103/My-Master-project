const User = require('../models/User') 
const { sendVerificationEmail } = require('../utils/email');
const { generateToken } = require('../utils/jwt');;

exports.register = async (req, res) => {
  try {
    const {
      nationalIdNumber,
      firstName,
      middleName,
      lastName,
      gender,
      phone,
      email,
      password
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { nationalIdNumber },
        { email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: existingUser.nationalIdNumber === nationalIdNumber 
          ? 'National ID already registered' 
          : 'Email already in use'
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const newUser = new User({
      nationalIdNumber,
      firstName,
      middleName,
      lastName,
      gender,
      phone,
      email,
      password,
      verificationCode
    });

    await newUser.save();

    // Send verification email
    // await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email for verification.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again.'
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email, verificationCode: code });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code'
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        nationalIdNumber: user.nationalIdNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed'
    });
  }
};