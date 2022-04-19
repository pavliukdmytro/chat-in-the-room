const { Schema, model} = require('mongoose');

const roomSchema = new Schema({
  roomId: {
    type: String,
    unique: true
  },
  messages: {
    type: Array,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = model('Room', roomSchema);