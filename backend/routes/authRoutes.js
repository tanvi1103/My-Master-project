const express = require('express'); 
const { register, verifyEmail } =  require('../controllers/authController.js');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/verify-email
router.post('/verify-email', verifyEmail);

module.exports = router;