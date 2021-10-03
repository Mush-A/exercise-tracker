const mongoose = require('mongoose');

const MONGO_URI = process.env['mongo_URI']

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB...')
  } catch(err) {
    console.log(err)
  }
}

module.exports = {connectDB};