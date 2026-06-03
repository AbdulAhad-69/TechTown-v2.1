const express = require('express');
const router = express.Router();
const {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    cancelOrder,
    updateOrderStatus // <-- We import the new function here
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Route /api/orders
router.post('/', protect, createOrder); 
router.get('/', protect, admin, getOrders); 

// Route /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// Route /api/orders/:id/*
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/cancel', protect, cancelOrder); 
router.put('/:id/status', protect, admin, updateOrderStatus); // <-- The dynamic status route!

module.exports = router;