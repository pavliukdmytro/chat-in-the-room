const SocketIOFile = require("socket.io-file");
const path = require("path");
const Room = require('../models/Room');

module.exports = (socket, roomId, user, io) => {

  const uploader = new SocketIOFile(socket, {
    uploadDir: path.join(__dirname, '../../', 'uploads'),							// simple directory
    accepts: [
      'audio/mpeg',
      'audio/mp3',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg',
      'image/webp',
    ],		// chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
    maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
    chunkSize: 1024 * 5,							// 5 kb
    transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
    overwrite: true 							// overwrite file if exists, default is true.
  });

  // uploader.on('start', (fileInfo) => {
  //   console.log('Start uploading');
  //   console.log(fileInfo);
  // });
  // uploader.on('stream', (fileInfo) => {
  //   console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
  // });
  uploader.on('complete', async (fileInfo) => {
    console.log('Upload Complete.');
    console.log(fileInfo);

    const room = await Room.findOneAndUpdate({ roomId }, {
      $push: {
        messages: {
          ...fileInfo.data,
          author: user.id,
          file: {
            mime: fileInfo.mime,
            name: fileInfo.name,
            path: `/${ fileInfo.name }`,
          }
        }
      }
    }, {
      new: true
    }).populate({
      path: 'users',
      select: 'name photo email _id'
    }).populate({
      path: 'messages.author',
      select: 'name photo email _id',
    });


    io.to(roomId).emit('CHAT:SEND_DATA', room);

  });
  // uploader.on('error', (err) => {
  //   console.log('Error!', err);
  // });
  // uploader.on('abort', (fileInfo) => {
  //   console.log('Aborted: ', fileInfo);
  // });

}