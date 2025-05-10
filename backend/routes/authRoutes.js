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

module.exports = router;