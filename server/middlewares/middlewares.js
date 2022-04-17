const session = require('express-session');
const express = require('express');
const path = require('path');
const passport = require('passport');
const MongoDBStore = require('express-mongodb-session')(session);
const formData = require("express-form-data");

const { DB_PATH, SECRET_SESSION } = process.env;

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'mySessions'
});

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, '../../', 'uploads')));

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