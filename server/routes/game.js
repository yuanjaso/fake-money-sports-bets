const express = require('express');
const random = require('lodash/random');

const GameModel = require('../models/game');

const router = express.Router();

router.get('/games/mlb', (req, res, next) => {
  res.json([]);
});

router.get('/games/nhl', (req, res, next) => {
  res.json([
    {
      home: {
        name: 'Pittsburgh Penguins',
        moneyLine: -100,
        spreadOdds: -150,
        spread: -2.5,
      },
      away: {
        name: 'New York Rangers',
        moneyLine: 130,
        spreadOdds: -150,
        spread: +2.5,
      },
    },
    {
      home: {
        name: 'Toronto Maple Leafs',
        moneyLine: -160,
        spreadOdds: -150,
        spread: -2.5,
      },
      away: {
        name: 'Calgary Flames',
        moneyLine: 150,
        spreadOdds: -150,
        spread: +2.5,
      },
    },
    {
      home: {
        name: 'Buffalo Sabres',
        moneyLine: -140,
        spreadOdds: -150,
        spread: -2.5,
      },
      away: {
        name: 'Washington Capitols',
        moneyLine: 150,
        spreadOdds: -150,
        spread: +2.5,
      },
    },
  ]);
});

router.get('/games/nfl', (req, res, next) => {
  res.json([
    {
      home: {
        name: 'Tampa Bay Buccaneers',
        moneyLine: 145,
        spreadOdds: -105,
        spread: 3,
      },
      away: {
        name: 'Kansas City Chiefs',
        moneyLine: -170,
        spreadOdds: -115,
        spread: -3,
      },
    },
  ]);
});

router.get('/games/nba', async (req, res, next) => {
  const date = req.query.date;
  try {
    const scoreboard = await GameModel.findOne({ date });
    const games = scoreboard.games.map((el) => ({
      // don't have gambling odds yet so randomize for POC
      home: {
        name: el.home.name,
        score: el.home.score,
        moneyLine: random(120, 150),
        spreadOdds: random(-100, -50),
        spread: random(1, 3),
      },
      away: {
        name: el.away.name,
        score: el.away.score,
        moneyLine: random(120, 150),
        spreadOdds: random(-100, -50),
        spread: random(1, 3),
      },
    }));
    res.json(games);
  } catch (err) {
    // not ideal but temporary
    res.json([]);
  }
});

module.exports = router;
