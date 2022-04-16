const express = require('express');
const path = require('path');

const app = express();

require('./middlewares/middlewares')(app);

require('./config/passportConfig');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.end('Hello world!!');
});

app.post('/sign-up', require(path.join(__dirname, 'routes/sign-up.js')));

app.post('/sign-in', require('./routes/sign-in'));

require('./db.js')(app);