const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.post('/', async (req, res) => {
  const { roomId } = req.body;

  if (roomId.length != 4) {
    return res.json({
      ok: false,
      error: 'room id must be 4 characters',
    })
  }

  try {
    const room = new Room({
      ...req.body,
      owner: req.user.id,
    });

    await room.save();
  } catch (err) {  } finally {
    res.json({
      ok: true,
      roomId,
    });
  }
});

router.get('/', async (req, res) => {
  const rooms = await Room.find();

  res.json({
    ok: true,
    rooms
  })
})

module.exports = router;