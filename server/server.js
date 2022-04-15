const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
});

const upload = multer({ storage: storage });

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.end('Hello world!!');
});

app.post('/sign-up', upload.single('photo'), require(path.join(__dirname, 'routes/sign-up.js')));

app.post('/sign-in', multer().none(), require(path.join(__dirname, 'routes/sign-in.js')));

require('./db.js')(app);