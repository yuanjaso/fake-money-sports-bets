const axios = require('axios');
const schedule = require('node-schedule');
const puppeteer = require('puppeteer');

const debug = true;

// ? can multiple jobs be scheduled?
// example: one rule for every monday and all fridays at 1pm as two separate rules

const rule = new schedule.RecurrenceRule();

if (debug) {
  rule.second = new schedule.Range(0, 59, 15);
  // rule.minute = new schedule.Range(0, 59, 1);
} else {
  // 12PM to 2AM
  rule.hour = [new schedule.Range(0, 2), new schedule.Range(12, 23)];
  // every 15 minutes
  rule.minute = [new schedule.Range(0, 59, 15)];
  rule.tz = 'America/Toronto';
}

// scrap espn for nba score data
schedule.scheduleJob(rule, async (date) => {
  console.log('running job', date);
  const url = 'https://www.espn.com/nba/scoreboard/_/date/20210221';

  // --no-sandbox option is for running Puppeteer on Heroku
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  const data = await page.evaluate(() => {
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

  const serverDomain =
    process.env.NODE_ENV === 'production'
      ? 'https://fakemoneysportsbets.com'
      : 'http://localhost:5000';

  axios
    .post(`${serverDomain}/api/games/nba`, { nba: data })
    .then(() => {})
    .catch(console.error);
});
