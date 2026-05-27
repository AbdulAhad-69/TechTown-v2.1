const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

// Route /api/ai/chat
router.post('/chat', protect, chatWithAI);

module.exports = router;