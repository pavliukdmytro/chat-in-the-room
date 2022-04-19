const Room = require('../models/Room');

module.exports = (server, io) => {

  io.on('connection', async (socket) => {
    const { user }  = socket?.handshake?.session?.passport;
    const { roomId } = socket.handshake.query;

    const room = await Room.findOneAndUpdate({ roomId }, {
      $addToSet: {
        users: user.id
      }
    }, {
      new: true,
    }).populate('users');
    // console.log('connect', user.id);

    socket.join(roomId);


    /**
     * send init data
     */
    io.to(roomId).emit('SOCKET:SEND_DATA', room);

    socket.on('disconnect', async () => {
      const room = await Room.findOneAndUpdate({ roomId }, {
        $pull: {
          users: user.id
        }
      }, {
        new: true,
      }).populate('users');

      // console.log('disconnect', user.id);
      io.to(roomId).emit('SOCKET:SEND_DATA', room);
    });
  });
}