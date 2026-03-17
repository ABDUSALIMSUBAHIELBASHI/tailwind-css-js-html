// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors'); // Optional: for colored console output

// Load env vars
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Abdu Salim Portfolio API',
    status: 'active',
    endpoints: {
      auth: '/api/auth',
      messages: '/api/messages'
    }
  });
});

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
  // Close server & exit process
  server.close(() => process.exit(1));
});