const session = require('express-session');
const express = require('express');
const path = require('path');
const passport = require('passport');
const MongoDBStore = require('express-mongodb-session')(session);
const formData = require("express-form-data");
const bodyParser = require('body-parser');

const { DB_PATH, SECRET_SESSION } = process.env;

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'mySessions'
});

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '../../', 'client/build')));
  app.use(express.static(path.join(__dirname, '../../', 'uploads')));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())
  // parse form data
  app.use(formData.parse({
    uploadDir: path.join(__dirname, '../../', 'uploads'),
  }));

  app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store,
  }));

  app.use(passport.authenticate('session'));
}