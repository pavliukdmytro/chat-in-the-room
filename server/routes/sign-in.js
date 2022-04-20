const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) {
      return res.json({
        ...info,
        ok: false,
      });
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }

      delete user?._doc?.password;

      return res.json({
        user: {
          ...user?._doc,
          id: user._doc._id,
        },
        ok: true,
      })
    });
  })(req, res, next);
};