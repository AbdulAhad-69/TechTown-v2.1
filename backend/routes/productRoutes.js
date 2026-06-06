const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    getSellerProducts 
} = require('../controllers/productController');

const { protect, adminOrSeller } = require('../middlewares/authMiddleware'); 

// --- PUBLIC ROUTES (Anyone can view products) ---
router.get('/', getProducts);
router.get('/:id', getProductById);

// --- MULTI-VENDOR ROUTES (Admins AND Sellers) ---
// Note: /seller/myproducts MUST go above /:id
router.get('/seller/myproducts', protect, adminOrSeller, getSellerProducts); 
router.post('/', protect, adminOrSeller, createProduct);
router.delete('/:id', protect, adminOrSeller, deleteProduct);

module.exports = router;