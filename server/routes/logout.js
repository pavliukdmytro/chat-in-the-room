module.exports = (req, res) => {
  req.logout();
  res.json({
    ok: true,
  })
}