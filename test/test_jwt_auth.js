const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const faker = require('faker');

const {app, runServer, closeServer} = require('../server');
const {Users} = require('../users');
const {TEST_DATABASE_URL, JWT_SECRET} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth endpoints', function(){
  const newUser = {  
      title: "Assistant Professor",
      userName: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      },
      email: "samuel@gmail.com",   
      password: "pass1",
      tel: faker.phone.phoneNumber,
      region: "North America",
      country: faker.address.country(),
      state: faker.address.state(),
      university: "New Mexico State University",
      department: "Computer Science",
      researchSum: faker.lorem.sentence(),
      biography: faker.lorem.sentence(),
      img: faker.image.imageUrl,
      cv: "",
      link: {
        link1: "",
        link2: ""
      }
    }

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return Users.hashPassword(newUser.password)
    .then(function(password){
      newUser.password = password;
      Users.create(newUser)
    });
  });

  afterEach(function() {
    return Users.remove({});
  });


  describe('/api/auth/login', function(){

    it('should reject requests with no credentials', function(){
      return chai.request(app)
        .post('/api/auth/login')
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
          )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
      });
    })
  })
})