require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const S3FS = require('s3fs');
const fs = require('fs'); 
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

//const multiparty = require('connect-multiparty');
//const multipartyMiddleware = multiparty();


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

const {PORT, DATABASE_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION, EMAIL, EMAIL_PASS} = require('./config');

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

//app.use("/node_modules",express.static(__dirname + '/node_modules'));
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//const S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
AWS.config.region = S3_REGION;
//console.log(S3_REGION);

app.get('/api/upload', (req, res) => {
  const s3 = new AWS.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read'
  };
  console.log(S3_BUCKET)
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3.${S3_REGION}.amazonaws.com/${S3_BUCKET}/${fileName}`
      //url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});



//send email

app.get('/send',function(req,res){
  console.log("email:"+EMAIL +"  pass:"+EMAIL_PASS);
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS
    }
  });
  var mailOptions={
    sender: req.query.from,
    from: req.query.from,
    to : EMAIL,
    subject : 'from: '+req.query.from +' subject: '+ req.query.subject,
    text : req.query.message
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " );
      console.log(response);
      res.end("sent");
    }
  });

});

/*
 ContentLength: req.query.size
app.post('/api/upload', multipartyMiddleware, function(req, res){

  const s3fsImpl = new S3FS('awsunivprof', {
      accesskeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
  });

  //s3fsImpl.create();

  var file = req.files.file; 
  console.log(file);
  var stream = fs.createReadStream(file.path);
  s3fsImpl.writeFile(file.originalFilename, stream, function(err){
    if(err) throw err;
    console.log('successfully save data in aws s3')
  })
})

*/

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Not Found'});
});
// both runServer and  closeServer need to access the same
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
