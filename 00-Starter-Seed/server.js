const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth, requiresAuth } = require('express-openid-connect');
// dotenv.load();

const app = express();

const config = {
  'issuerBaseURL': 'https://globalidpdta.randstadservices.com',
  'baseURL': 'http://localhost:30001/',
  'clientID': 'tHIWxBHIdTwgOknvqFJSy8RBeX2z3YyU',
  'secret': 'secretss',
  authRequired: false,
  auth0Logout: true,
  'clientSecret':
    'oqYlrZ3mw701JgtbWTh8V2SQikBKR98aPL5rWHlyVdFJFtOKwLHNAB21rUl1izIV',
  'authorizationParams': {
    'response_type': 'code',
    'scope': 'openid profile email',
  },
};

// {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: 'http://localhost:3000',
//   clientID: 'YOUR_CLIENT_ID',
//   issuerBaseURL: 'https://YOUR_DOMAIN',
//   secret: 'LONG_RANDOM_STRING'
// };

// auth router attaches /login, /logout, and /callback routes to the baseURL




// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// app.use('/', requiresAuth(), router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

const port = process.env.PORT || '30001';

http.createServer(app)
  .listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
