module.exports = (server, io) => {

  io.on('connection', (socket) => {

    const { user } = socket?.handshake?.session?.passport;
    console.log(user);

  });
}