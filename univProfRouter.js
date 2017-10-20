const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();


const {UnivProf} = require('./models');

//get back all users if get on the root
router.get('/', (req, res)=>{
  UnivProf
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


//add a new post to a db
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
  UnivProf
  .create({
    name:req.body.name,
    email:req.body.email,
    password: req.body.password,
    country: req.body.country,
    state: req.body.state,
    university: req.body.university,
    speciality: req.body.speciality,
    researchSum:req.body.researchSum 
  })
  .then(
    post => res.status(201).json(post.apiRepr())
  )
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'});
  });
});






module.exports= router;