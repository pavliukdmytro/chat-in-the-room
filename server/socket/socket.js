const Room = require('../models/Room');
const path = require('path');

module.exports = (server, io) => {

  io.on('connection', async (socket) => {
    const user  = socket?.handshake?.session?.passport?.user;
    const { roomId } = socket.handshake.query;

    // upload images
    require('./uploader')(socket, roomId, user, io);

    let room = null;

    if (user) {
      room = await Room.findOneAndUpdate({ roomId }, {
        $addToSet: {
          users: user.id
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
    } else {
      room = await Room.findOne({ roomId }).populate({
        path: 'users',
        select: 'name photo email _id'
      }).populate({
        path: 'messages.author',
        select: 'name photo email _id',
      });
    }

    socket.join(roomId);

    /**
     * send init data
     */
    io.to(roomId).emit('CHAT:SEND_DATA', room);

    socket.on('CHAT:MESSAGE', require(path.join(__dirname, 'message'))(io, user, roomId));
    if (user) {
      socket.on('disconnect', async () => {
        const room = await Room.findOneAndUpdate({ roomId }, {
          $pull: {
            users: user.id
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
      });

      if (room?.owner?.toString() === user?.id) {
        socket.on('CHAT:REMOVE_ROOM', async () => {
          try {
            await Room.findOneAndDelete({ roomId });

            io.to(roomId).emit('CHAT:ROOM_REMOVED', { roomId });
          } catch(err) {
              console.error(err);
          }
        })
      }

    }
  });
}