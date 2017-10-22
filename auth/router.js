const express = require('express');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

/*const config = require('../config');

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.email,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};
*/

const router = express.Router();

router.get('/protected', function(req, res, next) {
  res.sendfile('views/login.html');
});


router.get('/loginFailure' , function(req, res, next){
    res.send('Failure to authenticate');
});

router.get('/loginSuccess' , function(req, res, next){
    res.send('Successfully authenticated');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/api/auth/login',
    failureFlash: true,
    successFlash: true
}));


/* Handle Logout */
router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/*router.post(
    '/refresh',
    // The user exchanges an existing valid JWT for a new one with a later
    // expiration
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken});
    }
);
*/
module.exports = {router};