const { Schema, model} = require('mongoose');

const roomSchema = new Schema({
  roomId: {
    type: String,
    unique: true
  },
  messages: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: Date,
    message: String,
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = model('Room', roomSchema);