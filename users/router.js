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

router.get('/country', (req, res)=>{
  Users
  .find({}, {"country":1, '_id':0}).sort({"country":1})
  .then(result =>{
    res.status(200).json({'users':result})
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});

router.get('/country/:country', (req, res)=>{
  Users
  .find({country:{$regex: '.*' + req.params.country + '.*', $options: 'i' }} )
  .sort({"country":1})
  .then(result =>{
    res.status(200).json({'users':result.map(user => user.apiRepr())})
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});


router.get('/department', (req, res)=>{
  Users
  .find({}, {"department":1, '_id':0}).sort({"department":1})
  .then(result =>{
    res.status(200).json({'users':result})
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});

router.get('/department/:department', (req, res)=>{
  Users
  .find({department:{$regex: '.*' + req.params.department + '.*', $options: 'i' }} )
  .sort({"department":1})
  .then(result =>{
    res.status(200).json({'users':result.map(user => user.apiRepr())})
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:'Internal server error'})
  })
});

//get back post with a given id
/* 
router.get('/:id', jsonParser, (req, res)=>{
  Users.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err =>{
    console.error(err);
    res.status(500).json({message:"Internal server error"})
  })
});

*/

//get back all users  on GET endpoint
router.get('/:searchTerm', (req, res)=>{
  console.log(req.params)
  Users
  .find({$or:[
    {department:{$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {country: {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {'userName.firstName': {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }},
    {'userName.lastName': {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }}
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
router.get('/:searchTerm', (req, res)=>{
  console.log(req.params)
  Users
  .find({'name.firstName name.lastName': {$regex: '.*' + req.params.searchTerm + '.*', $options: 'i' }})
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

*/


//register a new user in db on POST
router.post('/', jsonParser, (req, res)=>{
  const requiredFields = ['title','userName', 'email', 'password', 'country', 'state', 'university', 'department', 'researchSum'];
  const missingField = requiredFields.find(field => !(field in req.body));
    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

//throw error if the field any of these field is empty or underfined
  const validFields = ['region', 'country', 'state'];
  const NoValidField =  validFields.find(field => (req.body[field] == underfined || req.body[field]==""))
    if(NoValidField){
       return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }
  //throw error if email or password start or end with whitespace
  const explicityTrimmedFields = ['email', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

  const sizedFields = {
        email: {
            min: 1
        },
        password: {
            min: 5,
            max: 15  // bcrypt truncates after 72 characters
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field =>
            'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
                ? `Must be at least ${sizedFields[tooSmallField]
                      .min} characters long`
                : `Must be at most ${sizedFields[tooLargeField]
                      .max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }
  let email = (req.body.email).trim();
  if((email.indexOf('@') < 1 ) || email.lastIndexOf('.') < 3 || email.lastIndexOf('.') < email.indexOf('@')){
    return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Invalid email address',
            location: 'email'
        });
  }

  return Users.find({email})
  .count()
  .then(count => {
    if(count > 0){
      return Promise.reject({
        code: 422,
        reason:'ValidationError',
        message:'Email already taken',
        location: 'email'
      });
    }
    return Users.hashPassword(req.body.password);
  })
  .then(hash => {
    return Users
    .create({
      userName:req.body.userName,
      email:req.body.email,
      password: hash,
      tel: req.body.tel,
      region: req.body.region,
      country: req.body.country,
      state: req.body.state,
      title: req.body.title,
      university: req.body.university,
      department: req.body.department,
      researchSum: req.body.researchSum,
      biography: req.body.biography,
      img: req.body.img,
      cv: req.body.cv,
      link: req.body.link
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


//ToDo delete user and update
router.delete('/:id', (req, res) => {
  console.log('About to remove user: '+req.params.id+ 'from the database!!!!')
  Users.remove({"_id": req.params.id})
  .then(status =>{
    //res.status(204).json({message:'Account successfully deleted'});
    res.redirect('/');
  })
  .catch(err =>{
    res.status(500).json({message:'Internal server error'});
  })
 
})



module.exports= {router};