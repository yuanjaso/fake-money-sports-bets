const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountRoutes = require('./routes/account');

// environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// connect to mongodb
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// express server setup
const app = express();
app.use(express.static(`${__dirname}/dist/fake-money-sports-bets/`));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', accountRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
