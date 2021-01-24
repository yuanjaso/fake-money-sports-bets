const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

const gameRoutes = require('./routes/game');
const accountRoutes = require('./routes/account');
const authRoutes = require('./routes/auth');
const AccountModel = require('./models/account');

const MongoStore = connectMongo(expressSession);

// environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const NODE_ENV = process.env.NODE_ENV;

// connect to mongodb
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// express server setup
const app = express();
app.use(express.static(`${__dirname}/../dist/fake-money-sports-bets/`));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

let secureCookie;
let origin;
if (NODE_ENV === 'production') {
  secureCookie = true;
  // this is needed when deploying on heroku with the secure flag on
  // otherwise cookie isn't sent to client
  app.set('trust proxy', 1);
} else {
  secureCookie = false;
  origin = 'http://localhost:4200';
}
app.use(cors({ credentials: true, origin }));
app.use(
  expressSession({
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: true,
      secure: secureCookie,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', gameRoutes);
app.use('/api', accountRoutes);
app.use('/api', authRoutes);

// last middleware used as a fallback option for the frontend to serve static files properly
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './dist/fake-money-sports-bets' });
});

// passport configuration
passport.use(new passportLocal.Strategy(AccountModel.authenticate()));
passport.serializeUser(AccountModel.serializeUser());
passport.deserializeUser(AccountModel.deserializeUser());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
