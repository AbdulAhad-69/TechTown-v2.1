const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe, applySeller, getSellerRequests, updateSellerStatus } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public Routes (Anyone can access these)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Routes (User must be logged in to access)
router.get('/me', protect, getMe);
router.post('/apply-seller', protect, applySeller);
router.get('/seller-requests', protect, admin, getSellerRequests); 
router.put('/:id/seller-status', protect, admin, updateSellerStatus); 
module.exports = router;