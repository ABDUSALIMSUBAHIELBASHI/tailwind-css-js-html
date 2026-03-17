// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // This was missing
const colors = require('colors');

// Load env vars
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Abdu Salim Portfolio API',
    status: 'active'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Import routes
try {
  const authRoutes = require('./routes/authRoutes');
  const messageRoutes = require('./routes/messageRoutes');
  
  console.log('✅ Routes loaded successfully');
  
  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
  
  console.log('✅ Routes mounted successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});