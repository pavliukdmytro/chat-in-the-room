const Room = require('../models/Room');

module.exports = (io, user, roomId) => async (data) => {
  const room = await Room.findOneAndUpdate({ roomId }, {
    $push: {
      messages: {
        ...data,
         author: user.id,
      }
    }
  }, {
    new: true,
  }).populate({
    path: 'users',
    select: 'name photo email _id'
  }).populate({
    path: 'messages.author',
    select: 'name photo email _id',
  });

  io.to(roomId).emit('CHAT:SEND_DATA', room);
}