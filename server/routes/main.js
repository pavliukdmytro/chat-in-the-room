const path = require("path");
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const indexFilePath = path.join(__dirname, '../../', 'client/build/index.html');
    await fs.promises.access(indexFilePath, fs.constants.R_OK);

    res.sendFile(indexFilePath);
  } catch(err) {
    res.end('start server...');
  }
}