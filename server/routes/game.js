const express = require('express');

const router = express.Router();

router.get('/games/nba', (req, res, next) => {
  res.json([
    {
      home: {
        name: 'Toronto Raptors',
        moneyLine: 125,
      },
      away: { name: 'Dallas Mavericks', moneyLine: -140 },
    },
    {
      home: { name: 'Orlando Magic', moneyLine: 300 },
      away: { name: 'New York Knicks', moneyLine: -450 },
    },
    {
      home: { name: 'Cleveland Cavaliers', moneyLine: -140 },
      away: { name: 'Washington Wizards', moneyLine: 150 },
    },
    {
      home: { name: 'Minnesota Timberwolves', moneyLine: -140 },
      away: { name: 'Atlanta Hawks', moneyLine: 160 },
    },
    {
      home: { name: 'San Antonio Spurs', moneyLine: -140 },
      away: { name: 'Portland Trailblazers', moneyLine: 160 },
    },
    {
      home: { name: 'Phoenix Suns', moneyLine: -140 },
      away: { name: 'Memphis Grizzlies', moneyLine: 170 },
    },
    {
      home: { name: 'Milwaukee Bucks', moneyLine: 340 },
      away: { name: 'Brooklyn Nets', moneyLine: -160 },
    },

    {
      home: { name: 'Detroit Pistons', moneyLine: 240 },
      away: { name: 'Miami Heat', moneyLine: -180 },
    },
    {
      home: { name: 'Houston Rockets', moneyLine: 120 },
      away: { name: 'Chicago Bulls', moneyLine: -140 },
    },
    {
      home: { name: 'Golden State Warriors', moneyLine: -140 },
      away: { name: 'Los Angeles Lakers', moneyLine: 140 },
    },
  ]);
});

router.get('/games/mlb', (req, res, next) => {
  res.json([]);
});

router.get('/games/nhl', (req, res, next) => {
  res.json([
    {
      home: { name: 'Pittsburgh Penguins', moneyLine: -100 },
      away: { name: 'New York Rangers', moneyLine: 130 },
    },
    {
      home: { name: 'Toronto Maple Leafs', moneyLine: -160 },
      away: { name: 'Calgary Flames', moneyLine: 150 },
    },
    {
      home: { name: 'Buffalo Sabres', moneyLine: -140 },
      away: { name: 'Washington Capitols', moneyLine: 150 },
    },
  ]);
});

router.get('/games/nfl', (req, res, next) => {
  res.json([
    {
      home: { name: 'Buffalo Bills', moneyLine: 270 },
      away: { name: 'Kansas City Chiefs', moneyLine: -150 },
    },
    {
      home: { name: 'Tampa Bay Buccaneers', moneyLine: 190 },
      away: { name: 'Green Bay Packers', moneyLine: -140 },
    },
  ]);
});

module.exports = router;
