const express = require('express');
const path = require("path");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");

router.get('/', (req, res) => {
  let user = req.user ? { ...req.user } : null;
  // console.log(user)
  res.json({
    ok: true,
    user,
  })
})

router.put('/', async (req, res) => {
  const { newPassword, confirmNewPassword, oldPassword } = req.body;
  let error = '';

  const user = await User.findById(req.user.id);

  let copyNewUser = {
    name: req.body.name,
  }

  if (newPassword) {
    if (newPassword?.length < 6) {
      error = 'new password mast be 6 or more characters!!';
    } else if (newPassword !== confirmNewPassword) {
      error = 'password isn\'t match';
    }
    const isCoincides = await bcrypt.compare(oldPassword, user.password);
    if (!isCoincides) {
      return res.json({
        ok: false,
        error: 'old password isn\'t correct',
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    copyNewUser.password = hash;
  }

  if (!error) {
    const updatedUser = await User.updateOne({ id: req.user.id }, copyNewUser);

    // console.log(updatedUser);
    req.logout();

    res.json({
      ok: true,
    })
  } else {
    res.json({
      ok: false,
      error: error,
    })
  }
});

module.exports = router;