// test-mongodb.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/test_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log('Connection URI:', MONGODB_URI);
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});