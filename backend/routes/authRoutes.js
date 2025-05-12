const express = require('express'); 
const { register, verifyEmail, login, verifyLogin, forgotPassword, verifyResetCode, resetPassword } =  require('../controllers/authController.js');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/verify-email
router.post('/verify-email', verifyEmail);

// Login routes
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);

const { authenticateUser } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Admin = require('../models/Admin');

router.get('/me', authenticateUser, async (req, res) => {
  try {
    let user;
    
    if (req.user.modelType === 'Admin') {
      user = await Admin.findById(req.user._id).select('-password');
    } else {
      user = await User.findById(req.user._id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      ...user.toObject(),
      modelType: req.user.modelType
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;