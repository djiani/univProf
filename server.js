require('dotenv').config(); // import the config file
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

//const favicon = require('static-favicon');


const {router: usersRouter} = require('./users');
const {router: authRouter, localStrategy} = require('./auth');

// configure mongoose to use ES6 promisses
mongoose.Promise = global.Promise;

const app = express();
const {PORT, DATABASE_URL} = require('./config');

//import static file
//app.use(express.static('public'));
// log the http layer
//app.use(morgan('common'));

//new added for local strategies

app.use(express.static('public'));
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());



// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

//initial endpoint at the base of the app to log the index.html file
app.get('/', (req, res) => {
  console.log('test running app');
  res.sendFile(__dirname + '/views/index.html');
});

//app.use(passport.initialize());
passport.use(localStrategy);
//passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


// A protected endpoint which needs a valid JWT to access it
app.get(
    '/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        return res.json({
            data: 'rosebud'
        });
    }
);

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Not Found'});
});
// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;


// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}


// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};



module.exports = {app, runServer, closeServer};
