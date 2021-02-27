const schedule = require('node-schedule');
const random = require('lodash/random');
const puppeteer = require('puppeteer');
const socketioEmitter = require('socket.io-emitter');

// ! this process will do the work of a clock/worker processes as a way to save cost on running another worker process
// ! in the future, the work will be separated

const debug = true;

const NODE_ENV = process.env.NODE_ENV;

// let REDIS_URL;
// if (NODE_ENV === 'production') {
//   REDIS_URL = process.env.REDIS_TLS_URL;
// } else {
//   REDIS_URL = process.env.REDIS_URL;
// }

// ? temporarily using redis protocol instead of rediss 
const REDIS_URL = process.env.REDIS_URL;

// ? can multiple jobs be scheduled?
// example: one rule for every monday and all fridays at 1pm as two separate rules

const rule = new schedule.RecurrenceRule();

if (debug) {
  // rule.second = new schedule.Range(0, 59, 15);
  rule.minute = new schedule.Range(0, 59, 5);
} else {
  // 12PM to 2AM
  rule.hour = [new schedule.Range(0, 2), new schedule.Range(12, 23)];
  // every 15 minutes
  rule.minute = [new schedule.Range(0, 59, 15)];
  rule.tz = 'America/Toronto';
}

const emitter = socketioEmitter(REDIS_URL);

emitter.redis.on('error', (err) => {
  console.log(err);
});

// scrap espn for nba score data
schedule.scheduleJob(rule, async (date) => {
  console.log('running job:', date);
  const year = new Date().getFullYear();
  const month = '02';
  // random scoreboard from feb 10th - 26th
  const day = random(10, 26);
  const league = 'nba';
  const scoreBoardDate = `${year}${month}${day}`;
  const url = `https://www.espn.com/${league}/scoreboard/_/date/${scoreBoardDate}`;

  console.log('getting data from', url);

  // --no-sandbox option is for running Puppeteer on Heroku
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  const scoreboard = await page.evaluate(() => {
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
        const awayScore = el.querySelector('tr.away td.total span').textContent;
        const homeScore = el.querySelector('tr.home td.total span').textContent;
        data.push({
          away: { name: awayTeam, score: awayScore },
          home: { name: homeTeam, score: homeScore },
        });
      });
    return data;
  });

  await browser.close();

  // this will go to redis which will get picked up by the socket io redis adapter which will forward
  // the data over to the client
  emitter.emit('real-time-score-updates', { date: scoreBoardDate, scoreboard });
});
