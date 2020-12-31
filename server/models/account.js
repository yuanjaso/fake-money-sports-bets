const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    balance: Number,
  },
  { collection: 'accounts' }
);
const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;
