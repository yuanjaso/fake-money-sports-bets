const amqp = require('amqplib/callback_api');
const random = require('lodash/random');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const socketioEmitter = require('socket.io-emitter');

const GameModel = require('./models/game');

// environment variables
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
// ? temporarily using redis protocol instead of rediss
const REDIS_URL = process.env.REDIS_URL;

// connect to mongodb
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// let REDIS_URL;
// if (NODE_ENV === 'production') {
//   REDIS_URL = process.env.REDIS_TLS_URL;
// } else {
//   REDIS_URL = process.env.REDIS_URL;
// }

const emitter = socketioEmitter(REDIS_URL);

emitter.redis.on('error', (err) => {
  console.log(err);
});

amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'web-scrap';

    channel.assertQueue(queue, { durable: false });

    console.log(' [*] Waiting for messages in %s', queue);

    channel.consume(
      queue,
      (msg) => {
        console.log(' [x] Received %s', msg.content.toString());
        scrap(msg.content.toString());
      },
      { noAck: true }
    );
  });
});

async function scrap(league) {
  const year = new Date().getFullYear();
  const month = '02';
  // random scoreboard from feb 10th - 26th
  const day = random(10, 26);
  const scoreBoardDate = `${year}${month}${day}`;
  const url = `https://www.espn.com/${league}/scoreboard/_/date/${scoreBoardDate}`;

  console.log('getting data from', url);

  // --no-sandbox option is for running Puppeteer on Heroku
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url).catch((err) => console.log(err.name, err.message));
  const games = await page
    .evaluate(() => {
      const data = [];
      document.documentElement
        .querySelectorAll('article.basketball')
        .forEach((el) => {
          const awayTeam = el.querySelector(
            'tr.away td.away div.sb-meta span.sb-team-short'
          ).textContent;
          const homeTeam = el.querySelector(
            'tr.home td.home div.sb-meta span.sb-team-short'
          ).textContent;
          const awayScore = el.querySelector('tr.away td.total span')
            .textContent;
          const homeScore = el.querySelector('tr.home td.total span')
            .textContent;
          data.push({
            away: { name: awayTeam, score: Number(awayScore) },
            home: { name: homeTeam, score: Number(homeScore) },
          });
        });
      return data;
    })
    .catch((err) => {
      console.log(err.name, err.message);
    })
    .finally(() => {
      console.log('closing chromium');
      browser.close();
    });

  if (games === undefined) return;

  const date = `${year}-${month}-${day}`;

  // this will go to redis which will get picked up by the socket io redis adapter which will forward
  // the data over to the client
  emitter.emit('real-time-score-updates', { date, scoreboard: games });

  // write to database (historical retrieval purpose)
  saveToDB(date, league, games);
}

async function saveToDB(date, league, games) {
  const result = await GameModel.updateMany(
    { date, league },
    { games },
    { upsert: true }
  );
  console.log('insert result from database:', result);
 }
