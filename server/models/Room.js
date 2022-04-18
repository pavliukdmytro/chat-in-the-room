const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true
  },
  messages: {
    type: Array,
  },
  users: {
    type: Array,
  }
});

module.exports = mongoose.model('Room', roomSchema);