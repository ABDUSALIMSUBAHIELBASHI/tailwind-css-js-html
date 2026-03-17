// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage
} = require('../controllers/messageController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Validation rules
const messageValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('message').notEmpty().withMessage('Message is required')
];

// Public routes
router.post('/', messageValidation, createMessage);

// Private routes (Admin only)
router.get('/', protect, authorize('admin'), getMessages);
router.get('/:id', protect, authorize('admin'), getMessage);
router.put('/:id', protect, authorize('admin'), updateMessage);
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;