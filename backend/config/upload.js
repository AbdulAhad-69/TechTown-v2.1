const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// 1. Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure the Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'techtown_products', // Creates a folder in your Cloudinary account
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Strict MIME type validation
        transformation: [{ width: 800, height: 800, crop: 'limit' }] // Auto-resize to save bandwidth
    }
});

// 3. Initialize Multer with the Cloudinary storage
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit to prevent abuse
});

module.exports = upload;