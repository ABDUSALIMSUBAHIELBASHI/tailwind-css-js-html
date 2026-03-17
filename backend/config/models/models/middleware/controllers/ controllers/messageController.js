// controllers/messageController.js
const Message = require('../models/Message');
const { validationResult } = require('express-validator');

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const message = await Message.create(req.body);

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin only)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private (Admin only)
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update message read status
// @route   PUT /api/messages/:id
// @access  Private (Admin only)
const updateMessage = async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: req.body.isRead },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin only)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage
};