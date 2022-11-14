const mongoose = require('mongoose');

const config = require('../config');

async function connectDB() {
  try {
    await mongoose.connect(config.database);
    console.log('Connect database');
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  connectDB,
};
