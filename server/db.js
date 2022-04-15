const mongoose = require('mongoose');
const { SERVER_PORT, DB_PATH } = process.env;

module.exports = async (app) => {
  await mongoose.connect(DB_PATH);

  app.listen(SERVER_PORT || 8000);
};