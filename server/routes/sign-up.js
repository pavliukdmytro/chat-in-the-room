const crypto = require('crypto');
const path = require('path');

const User = require(path.join(__dirname, '..', 'models/User' ));



module.exports = (req, res) => {
  const salt = crypto.randomBytes(16);

  if (req?.body?.password?.length < 6) {
    return res.json({
      ok: false,
      error: 'password mast be 6 characters or more',
    })
  }

  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, password) => {
    try {
      if (err) {
        return next(err);
      }

      const photo = `/${ req?.file?.path || 'client/public/default-user.svg'}`;

      const body = {
        ...req.body,
        photo,
        password
      };

      const user = new User(body);

      await user.save();

      // console.log(newUser);
      // req.login(user, function(err) {
      //   if (err) { return next(err); }
      //   res.redirect('/');
      // });
    } catch (err) {
      const { username } = err?.keyValue;
      let error = 'something went wrong';

      if (username) {
        error = `${ username } has been registered`;
      } else {
        console.error(err);
      }

      res.json({
        ok: false,
        error
      })
    }
  });
}