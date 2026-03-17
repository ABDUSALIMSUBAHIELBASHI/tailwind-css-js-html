const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Using your new database name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/abdu-salim-portfolio')
.then(() => console.log('✅ MongoDB Connected to abdu-salim-portfolio database'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// ... rest of your code remains the same ...