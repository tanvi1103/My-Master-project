const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/email");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ nationalIdNumber }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error:
          existingUser.nationalIdNumber === nationalIdNumber
            ? "National ID already registered"
            : "Email already in use",
      });
    }

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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
      verificationCode,
    });

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed. Please try again.",
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
        error: "Invalid verification code",
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
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      error: "Email verification failed",
    });
  }
};

// Login with email or national ID
exports.login = async (req, res) => {
  try {
    const { email, nationalIdNumber, password } = req.body;
    const identifier = email || nationalIdNumber;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        error: "Email/Nationa ID is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Password is required",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long",
      });
    }

    // Find user by email or national ID
    const user = await User.findOne({
      $or: [{ email }, { nationalIdNumber }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      // Send verification email if not verified
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = code;
      user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      await user.save();

      await sendVerificationEmail(user.email, code);

      return res.json({
        success: true,
        requiresVerification: true,
        message: "Email verification required. Code sent to your email.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        nationalIdNumber: user.nationalIdNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
};

// Verify login with email code

// Forgot password - send reset code.
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No account with that email exists",
      });
    }

    // Generate and save reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.passwordResetCode = resetCode;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with reset code
    await sendVerificationEmail(user.email, resetCode);

    res.json({
      success: true,
      message: "Password reset code sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      error: "Server error sending reset code",
    });
  }
};

// Verify password reset code
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        error: "Email and code are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Check reset code
    if (user.passwordResetCode !== code) {
      return res.status(401).json({
        success: false,
        error: "Invalid reset code",
      });
    }

    // Check if code expired
    if (user.passwordResetExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        error: "Reset code has expired",
      });
    }

    res.json({
      success: true,
      message: "Code verified. You can now reset your password.",
    });
  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({
      success: false,
      error: "Server error verifying reset code",
    });
  }
};

// Reset password after code verification
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }
    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Reset code is required",
      });
    }
    if (!newPassword) {
      return res.status(400).json({
        success: false,
        error: "New password is required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters long",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Verify reset code and expiration
    if (user.passwordResetCode !== code) {
      return res.status(401).json({
        success: false,
        error: "Invalid reset code",
      });
    }

    if (user.passwordResetExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        error: "Reset code has expired",
      });
    }

    // Reset the password using the reusable method
    await user.resetPassword(newPassword);

    // Respond with success
    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      error:
        "An error occurred while resetting the password. Please try again later.",
    });
  }
};
