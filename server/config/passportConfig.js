const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, password, cb) {
  const user = await User.findOne({ email: email });

  if (user) {
    const isCoincides = await bcrypt.compare(password, user.password);

    if (!isCoincides) {
      return cb(null, false, { error: 'Incorrect email or password.' });
    }
    delete user.password;

    return cb(null, user);
  }

  cb(null, false, { error: 'Incorrect email or password.' });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log(user);

    cb(null, {
      id: user.id,
      email: user.email,
      photo: user.photo,
      name: user.name,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = passport;