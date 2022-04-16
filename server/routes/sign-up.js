const path = require('path');
const bcrypt = require('bcryptjs');

const User = require(path.join(__dirname, '..', 'models/User' ));

module.exports = async (req, res) => {
  try {
    const { password } = req.body;

    if (password?.length < 6) {
      return res.json({
        ok: false,
        error: 'password mast be 6 characters or more',
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let photo = '/client/public/default-user.svg';

    if (req?.files?.photo?.size) {
      photo = `${ req?.files?.photo?.path.replace('/app', '') }`;
    }

    const body = {
      ...req.body,
      password: hash,
      photo,
    };

    const user = new User(body);

    await user.save();

    req.login(user, function(err) {
      if (err) { return next(err); }

      delete user._doc.password;

      res.json({
        ok: true,
        user: {
          ...user._doc,
        }
      })
    });
  } catch (err) {
    let error = 'something went wrong';

    if (err?.code == 11000) {
      error = `email has been registered`;
    } else {
      console.error(err);
    }

    res.json({
      ok: false,
      error
    });
  }
}