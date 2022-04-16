const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  photo: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);