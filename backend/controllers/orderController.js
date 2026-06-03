const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order & deduct stock safely
// @route   POST /api/orders
// @access  Private (Logged in users)
const createOrder = async (req, res) => {
    try {
        const { orderItems, shipping_address, phone, payment_method } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        let calculatedTotal = 0;
        const verifiedItems = [];

        // 1. Verify prices and stock against the live database
        for (let i = 0; i < orderItems.length; i++) {
            const item = orderItems[i];
            const liveProduct = await Product.findById(item.productId);

            if (!liveProduct) {
                return res.status(404).json({ message: `Product ${item.name} not found in database.` });
            }

            if (liveProduct.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${liveProduct.name}. Only ${liveProduct.stock} left.` });
            }

            // Calculate total using REAL database price
            calculatedTotal += liveProduct.price * item.quantity;

            verifiedItems.push({
                productId: liveProduct._id,
                name: liveProduct.name,
                price: liveProduct.price,
                quantity: item.quantity,
                image: liveProduct.image
            });
        }

        // Add standard delivery fee (e.g., 120 BDT)
        calculatedTotal += 120;

        // 2. Create the order
        const order = new Order({
            userId: req.user._id,
            shipping_address,
            phone,
            payment_method,
            items: verifiedItems,
            total_amount: calculatedTotal
        });

        const createdOrder = await order.save();

        // 3. Deduct stock mathematically using MongoDB atomic operators
        for (const item of verifiedItems) {
            await Product.updateOne(
                { _id: item.productId },
                { $inc: { stock: -item.quantity } } // Subtracts the quantity
            );
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin view)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'id name email').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status to Delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = 'Delivered';
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel order & RESTORE stock
// @route   PUT /api/orders/:id/cancel
// @access  Private (Admin or Order Owner)
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Security: Only the user who made the order or an Admin can cancel it
        if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to cancel this order' });
        }

        if (order.status === 'Cancelled') {
            return res.status(400).json({ message: 'Order is already cancelled' });
        }

        if (order.status === 'Delivered') {
            return res.status(400).json({ message: 'Cannot cancel a delivered order' });
        }

        // 1. Change status
        order.status = 'Cancelled';
        await order.save();

        // 2. Loop through items and mathematically restore stock
        for (const item of order.items) {
            await Product.updateOne(
                { _id: item.productId },
                { $inc: { stock: item.quantity } } // Adds the quantity back
            );
        }

        res.status(200).json({ message: 'Order cancelled and inventory restored' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status (Dynamic)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the status to whatever the frontend sent (Pending, Shipped, Delivered)
        order.status = req.body.status;
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status", error: error.message });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    cancelOrder,
    updateOrderStatus
};