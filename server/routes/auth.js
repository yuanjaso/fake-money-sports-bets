const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    res.json();
  } catch (err) {
    next(err);
  }
});

router.get('/logout', (req, res, next) => {
  try {
    req.logout();
    res.clearCookie('connect.sid');
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
