const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc  Login/Landing page
//@route  GET /
router.get('/', ensureGuest, (req, res) => {
  res.status(200).json();
});

// @desc  Dashboard
//@route  GET /
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    // res.render('dashboard', {
    //   name: req.user.firstName,
    //   stories
    // })
    res.status(200).json({
      name: req.user.firstName,
      stories: stories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'error' });
  }
});

module.exports = router;
