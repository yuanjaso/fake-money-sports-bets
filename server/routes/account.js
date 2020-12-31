const express = require('express');
const passport = require('passport');

const AccountModel = require('../models/account');

const router = express.Router();

router.get('/accounts', async (req, res, next) => {
  try {
    let accounts = await AccountModel.find();
    accounts = accounts.map((el) => ({
      balance: el.balance,
    }));
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.post('/accounts', (req, res, next) => {
  try {
    AccountModel.register(
      new AccountModel({ username: req.body.username, balance: 100000 }),
      req.body.password,
      (err, account) => {
        if (err) {
          return res.status(409).json('Username is already taken');
        }

        passport.authenticate('local')(req, res, () => {
          res.status(201).json('Registered sucessfully');
        });
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
