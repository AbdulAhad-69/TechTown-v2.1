const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    shipping_address: {
        type: String,
        required: [true, 'Please add a shipping address']
    },
    phone: {
        type: String,
        required: [true, 'Please add a contact phone number']
    },
    payment_method: {
        type: String,
        default: 'Cash on Delivery'
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    // Embedding the items directly instead of using a separate relational table
    items: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true }, // The price at the time of purchase
        quantity: { type: Number, required: true },
        image: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);