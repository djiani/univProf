const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = express.Router();

const jsonParser = bodyParser.json();


const {Users} = require('./models');

//get back all users  on GET endpoint
router.get('/', (req, res)=>{
  Users
  .find()
  .then(result =>{
    res.status(200).json({
      'users':result.map(user => user.apiRepr())
    })
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});

//get back all users  on GET endpoint
router.get('/:searchTerm', (req, res)=>{
  console.log(req.params)
  Users
  .find({$or:[
    {speciality:{$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {country: {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {'name.firstName': {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {'name.lastName': {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }}
  ]})
  .then(result =>{
    res.status(200).json({
      'users':result.map(user => user.apiRepr())
    });
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});
/*

*/
//register a new user in db on POST
router.post('/', jsonParser, (req, res)=>{
  const requiredFields = ['name', 'email', 'password', 'country', 'state', 'university', 'speciality', 'researchSum'];
  for(let i=0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = 'Missing '+ field +' in request body';
      console.error(message);
      res.status(400).send(message);
    }
  }
  let email = req.body.email;
  email = email.trim();
  console.log(email);
  return Users.find({email})
  .count()
  .then(count => {
    if(count > 0){
      return promise.reject({
        code: 422,
        reason:'ValidatorError',
        message:'email already taken',
        location: 'email'
      });
    }
    return Users.hashPassword(req.body.password);
  })
  .then(hash => {
    return Users
    .create({
      name:req.body.name,
      email:req.body.email,
      password: hash,
      country: req.body.country,
      state: req.body.state,
      university: req.body.university,
      speciality: req.body.speciality,
      researchSum:req.body.researchSum 
    })
  })
  .then(
    post => res.status(201).json(post.apiRepr())
  )
  .catch(err =>{
    if(err.reason === 'ValidatorError'){
      return res.status(err.code).json(err);
    }
    console.log(err)
    res.status(500).json({message:'Internal server error'});
  });
});






module.exports= {router};