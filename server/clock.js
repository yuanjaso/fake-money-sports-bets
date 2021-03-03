const amqp = require('amqplib/callback_api');
const schedule = require('node-schedule');

// ! this process will do the work of a clock/worker processes as a way to save cost on running another worker process
// ! in the future, the work will be separated

const debug = true;

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

// scrap espn for nba score data
schedule.scheduleJob(rule, async (date) => {
  console.log('running job:', date);

  amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = 'web-scrap';
      const msg = 'nba';

      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
});
