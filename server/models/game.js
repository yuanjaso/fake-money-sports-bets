const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  date: Date,
  league: String,
  games: [
    {
      home: { name: String, score: Number },
      away: { name: String, score: Number },
    },
  ],
});
const GameModel = mongoose.model('game', GameSchema);

module.exports = GameModel;
