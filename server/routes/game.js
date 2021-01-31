const express = require('express');

const router = express.Router();

router.get('/games/nba', (req, res, next) => {
  res.json([
    {
      home: {
        name: 'Toronto Raptors',
        moneyLine: 125,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Dallas Mavericks',
        moneyLine: -140,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Orlando Magic',
        moneyLine: 300,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'New York Knicks',
        moneyLine: -450,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Cleveland Cavaliers',
        moneyLine: -140,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Washington Wizards',
        moneyLine: 150,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Minnesota Timberwolves',
        moneyLine: -140,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Atlanta Hawks',
        moneyLine: 160,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'San Antonio Spurs',
        moneyLine: -140,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Portland Trailblazers',
        moneyLine: 160,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Phoenix Suns',
        moneyLine: -140,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Memphis Grizzlies',
        moneyLine: 170,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Milwaukee Bucks',
        moneyLine: 340,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Brooklyn Nets',
        moneyLine: -160,
        spreadOdds: -110,
        spread: -1.5,
      },
    },

    {
      home: {
        name: 'Detroit Pistons',
        moneyLine: 240,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Miami Heat',
        moneyLine: -180,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Houston Rockets',
        moneyLine: 120,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Chicago Bulls',
        moneyLine: -140,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
    {
      home: {
        name: 'Golden State Warriors',
        moneyLine: -140,
        spreadOdds: -110,
        spread: 1.5,
      },
      away: {
        name: 'Los Angeles Lakers',
        moneyLine: 140,
        spreadOdds: -110,
        spread: -1.5,
      },
    },
  ]);
});

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

module.exports = router;
