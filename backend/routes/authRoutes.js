const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Public Routes (Anyone can access these)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Routes (User must be logged in to access)
router.get('/me', protect, getMe);

module.exports = router;