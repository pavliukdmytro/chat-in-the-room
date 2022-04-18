const mongoose = require('mongoose');
const { SERVER_PORT, DB_PATH } = process.env;

module.exports = async (server) => {
  await mongoose.connect(DB_PATH);

  server.listen(SERVER_PORT || 8000);
};