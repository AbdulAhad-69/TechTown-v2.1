const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    cancelOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Route /api/orders
router.post('/', protect, createOrder); // Anyone logged in can checkout
router.get('/', protect, admin, getOrders); // Only admins can see ALL orders

// Route /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// Route /api/orders/:id/*
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/cancel', protect, cancelOrder); // Protect middleware ensures user ownership check inside controller

module.exports = router;