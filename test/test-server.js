const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {app, runServer, closeServer} = require('../server');
const {Users} = require('../users');
const {DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHttp);

// we to generated some random data to populate our test database
function seedUsersData(){
  console.info('seeding Users data');
  const seedData = [];
  for (let i=1; i<10; i++){
    seedData.push(generateUsersData());
  }
  return Users.insertMany(seedUsersData);
}


function generateUsersData(){
  return { 
    title: "Assistant Professor",
    userName: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    },
    email: faker.internet.email(),
    tel: faker.phone.phoneNumber,
    region: "North America",
    country: faker.address.country(),
    state: faker.address.state(),
    university: "New Mexico State University",
    department: "Computer Science",
    researchSum: faker.lorem.sentences(3),
    biography: faker.lorem.sentences(3),
    password: "pass1",
    img: faker.image.imageUrl,
    cv: "",
    link: {
      link1: "",
      link2: ""
    }
  }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('University Api Resource', function(){

  before(function() {
    return runServer(DATABASE_URL);
  });

  beforeEach(function() {
    return seedUsersData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })

  describe('Get endpoint', function(){
    it('should return all existing users', function(){
      //get back all users return on request to '/api/users'

      let res;
      return chai.request(app)
      .get('api/users')
      .then(function(_res){
        res = _res;
        res.should.have.status(200);
        res.body.users.should.have.length.of.at.least(1);
        return Users.count();
      })
      .then(function(count){
        res.body.users.should.have.length.of(count);
      })
    })
  })


})