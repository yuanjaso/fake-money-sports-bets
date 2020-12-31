const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new mongoose.Schema(
  {
    username: String,
    salt: String,
    hash: String,
    balance: Number,
  },
  { collection: 'accounts' }
);
AccountSchema.plugin(passportLocalMongoose);

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;
