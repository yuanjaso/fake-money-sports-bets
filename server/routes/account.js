const express = require('express');

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

module.exports = router;
