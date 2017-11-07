const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.email,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const router = express.Router();
//{'authToken':authToken,'lastName':req.user.name.lastName, 'id':req.user.id
router.post(
    '/login',
    // The user provides email and password to login
    passport.authenticate('basic', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user.apiRepr());
        let userRes = {
            'userName': req.user.userName, 
            'id': req.user._id,  
            'authToken': authToken,      
        }
        res.json(userRes);
    }
    
);

router.post(
    '/refresh',
    // The user exchanges an existing valid JWT for a new one with a later
    // expiration
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user);
        res.json({authToken});
    }
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = {router};