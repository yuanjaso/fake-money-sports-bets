const express = require('express');
const passport = require('passport');

const AccountModel = require('../models/account');

const router = express.Router();

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json();
  }
}

router.get('/accounts', checkAuthenticated, async (req, res, next) => {
  try {
    let accounts = await AccountModel.find();
    accounts = accounts.map((el) => ({
      balance: el.balance,
      username: el.username,
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
          switch (err.name) {
            case 'MissingUsernameError':
            case 'MissingPasswordError':
              return res.status(400).json(err.message);
            case 'UserExistsError':
              return res.status(409).json(err.message);
          }
        }

        passport.authenticate('local')(req, res, () => {
          res.status(201).json({
            username: account.username,
            balance: account.balance,
          });
        });
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
