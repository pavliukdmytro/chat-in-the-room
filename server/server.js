const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);

/**
 * middlewares
 */
require('./middlewares/middlewares')(app);

/**
 * passport config
 */

require('./config/passportConfig');

/**
 * main http routes
 */

app.post('/sign-up', require(path.join(__dirname, 'routes/sign-up.js')));

app.post('/sign-in', require(path.join(__dirname, 'routes/sign-in')));

app.use('/auth', require(path.join(__dirname, 'routes/auth')));

app.post('/logout', require(path.join(__dirname, 'routes/logout')));

app.use('/rooms', require(path.join(__dirname, 'routes/rooms')));

app.get('*', require(path.join(__dirname, 'routes/mainPage')));

/**
 * socket connections
 */

require(path.join(__dirname, 'socket/socket'))(server);

/**
 * connecting to mongo db and start express server
 */

require('./db.js')(server);