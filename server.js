const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// environment variables
const PORT = process.env.PORT;

const app = express();
app.use(express.static(`${__dirname}/dist/fake-money-sports-bets/`));
app.use(morgan('dev'));
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
