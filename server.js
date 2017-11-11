require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const S3FS = require('s3fs');
const fs = require('fs'); 
//const AWS = require('aws-sdk');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();


// Here we use destructuring assignment with renaming so the two variables
// called router (from ./users and ./auth) have different names
// For example:
// const actorSurnames = { james: "Stewart", robert: "De Niro" };
// const { james: jimmy, robert: bobby } = actorSurnames;
// console.log(jimmy); // Stewart - the variable name is jimmy, not james
// console.log(bobby); // De Niro - the variable name is bobby, not robert
const {router: usersRouter} = require('./users');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

// Logging

app.use(morgan('common'));
app.use(express.static('public'))

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
})

//initial endpoint at the base of the app to log the index.html file
app.get('/', (req, res) => {
  console.log('test running app');
  res.sendFile(__dirname + '/views/index.html');
});


app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


// A protected endpoint which needs a valid JWT to access it
app.get(
    '/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        return res.json({
            user: req.user
        });
    }
);

//app.use(multipartyMiddleware);
const s3fsImpl = new S3FS('awsunivprof', {
  accesskeyId:'AKIAI3URK4C3ZXH4EKUA',
  secretAccessKey: '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'
});

s3fsImpl.create();

app.post('/api/upload', multipartyMiddleware, function(req, res){
  var file = req.files.file; 
  console.log(file);
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
    fs.unlink(file.path, function(err){
      if(err){ console.error(error);}
    })
    res.json({message:'successfully upload the file to aws s3'});
  })
  .catch(function(err){
    console.error(err);
  })
})

app.

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
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};



module.exports = {app, runServer, closeServer};
