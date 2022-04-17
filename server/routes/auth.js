module.exports = (req, res) => {
  let user = req.user ? { ...req.user } : null;

  res.json({
    ok: true,
    user,
  })
}