const path = require('path');

module.exports = (req, res) => {
  // const body = {
  //   ...req.body,
  //   photo: `/${req.file.path}`
  // };
  //
  // console.log(body);

  res.json({
    ok: false,
    error: 'sign-in'
  })
}