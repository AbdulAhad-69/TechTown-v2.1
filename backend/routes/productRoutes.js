const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct } = require('../controllers/productController');
const { protect, seller } = require('../middlewares/authMiddleware');
const upload = require('../config/upload'); // Cloudinary upload middleware

// Public Routes (Anyone can view products)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected Routes (Only Sellers and Admins can add/delete)
// 'upload.single("image")' tells Multer to look for a file named "image" in the form data
router.post('/', protect, seller, upload.single('image'), createProduct);
router.delete('/:id', protect, seller, deleteProduct);

module.exports = router;