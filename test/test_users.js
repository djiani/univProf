const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const {app, runServer, closeServer} = require('../server');
const {Users} = require('../users');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

// we to generated some random data to populate our test database
function seedUsersData(){
  console.info('seeding Users data');
  const seedData = [];
  for (let i=0; i<10; i++){
    seedData.push(generateUsersData());
  }
  return Users.insertMany(seedData);
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
    researchSum: faker.lorem.sentence(),
    biography: faker.lorem.sentence(),
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
    return runServer(TEST_DATABASE_URL);
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

  describe('Get', function(){
    it('should return all existing users', function(){
      let res;
      return chai.request(app)
      .get('/api/users')
      .then(function(_res){
        res = _res;
        expect(res).to.have.status(200);
        expect(res.body.users).to.an('array');
        expect(res.body.users).to.have.lengthOf.at.least(1);
        return Users.count();
      })
      .then(function(count){
        expect(res.body.users).to.have.lengthOf(count);
      })
    })
  

    it('should return the list of all country', function(){
      let _res;
      return chai.request(app)
      .get('/api/users/country')
      .then(function(res){
        _res = res;
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[0]).to.have.property('country');
        expect(res.body.users[0]).to.be.an('object').that.has.all.keys('country');
        return Users.count();
      })
      .then(function(count){
        expect(_res.body.users).to.have.lengthOf(count);
      })
    })

    it('should return the list of users for a given country', function(){
      let test_country = 'cameroun';
      return chai.request(app)
      .get('/api/users/country/'+ test_country)
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array');
        //expect(res.body.users).to.have.property('country');
        
        //how to check case by case
      })
    })

    it('should return the list of all department', function(){
      let _res;
      return chai.request(app)
      .get('/api/users/department')
      .then(function(res){
        _res = res;
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[0]).to.have.property('department');
        expect(res.body.users[0]).to.be.an('object').that.has.all.keys('department');
        return Users.count();
      })
      .then(function(count){
        expect(_res.body.users).to.have.lengthOf(count);
      })
    })

    it('should return the list of users for a given department', function(){
      let test_depart = 'computer Science';
      return chai.request(app)
      .get('/api/users/country/'+ test_depart)
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array');
        //expect(res.body.users).to.have.property('department');
        
      })
    })

    it('should return an empty object for a given department', function(){
      let test_depart = 'not_a_depart_name';
      return chai.request(app)
      .get('/api/users/country/'+ test_depart)
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.an('array').that.is.empty
        //expect(res.body.users).to.have.property('department');
      })
    })

    it('should return a list of users for a given searchTerm', function(){

    })

  })
/********************************************************
*                       POST                            *
********************************************************/
  describe('POST', function(){
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

    it('should reject with missing password', function(){
      return chai.request(app)
      .post('/api/users')
      .send(
        { title: "Assistant Professor",
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
          researchSum: faker.lorem.sentence(),
          biography: faker.lorem.sentence(),
          img: faker.image.imageUrl,
          cv: "",
          link: {
            link1: "",
            link2: ""
          }
        })
      .then(function(){
        expect.fail(null, null, 'Request should not succeed')
      })
      .catch(function(err){
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal('Missing field');
        expect(res.body.location).to.equal('password');
      })
    })

    it('should reject with non-trim password', function(){
      return chai.request(app)
      .post('/api/users')
      .send(
        { title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: faker.internet.email(),
          password: " pass1 ",
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
        })
      .then(function(){
        expect.fail(null, null, 'Request should not succeed')
      })
      .catch(function(err){
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal('Cannot start or end with whitespace');
        expect(res.body.location).to.equal('password');
      })
    })

    it('should reject with missing email field', function(){
          return chai.request(app)
          .post('/api/users')
          .send(
            { title: "Assistant Professor",
              userName: {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName()
              },
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
            })
          .then(function(){
            expect.fail(null, null, 'Request should not succeed')
          })
          .catch(function(err){
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('email');
          })
        })

    it('should reject with non-trim email', function(){
      return chai.request(app)
      .post('/api/users')
      .send(
        { title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: " samuel@gmail.com ",
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
        })
      .then(function(){
        expect.fail(null, null, 'Request should not succeed')
      })
      .catch(function(err){
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal('Cannot start or end with whitespace');
        expect(res.body.location).to.equal('email');
      })
    })

    it('Should reject users with empty email', function() {
      return chai.request(app)
      .post('/api/users')
      .send({ title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: "",
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
        })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
        )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal(
          'Must be at least 1 characters long'
          );
        expect(res.body.location).to.equal('email');
      });
    });
    
    it('Should reject users with password less than 5 characters', function() {
      return chai.request(app)
      .post('/api/users')
      .send({ title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: faker.internet.email(),
          password: "pas",
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
        })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
        )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal(
          'Must be at least 5 characters long'
          );
        expect(res.body.location).to.equal('password');
      });
    });

    it('Should reject users with password greater than 15 characters', function() {
      return chai.request(app)
      .post('/api/users')
      .send({  title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: faker.internet.email(),
          password: new Array(16).fill('a').join(''),
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
        })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
        )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal(
          'Must be at most 15 characters long'
          );
        expect(res.body.location).to.equal('password');
      });
    });

    it('Should reject users with invalid email', function() {
      return chai.request(app)
      .post('/api/users')
      .send({  title: "Assistant Professor",
          userName: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
          },
          email: "samuel",   
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
        })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
        )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(422);
        expect(res.body.reason).to.equal('ValidationError');
        expect(res.body.message).to.equal(
          'Invalid email address'
          );
        expect(res.body.location).to.equal('email');
      });
    });

    it('Should reject users with duplicate email', function() {
      return chai.request(app)
      .post('/api/users')
      .send(newUser)
      .then(function(){
        chai.request(app).post('/api/users')
        .send(newUser)
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }


          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Email already taken');
          expect(res.body.location).to.equal('email');
          //expect(Pomise.reject()).to.be.a('Promise');
        });
      });
    });

    it('Should create a new user', function() {
      return chai.request(app)
      .post('/api/users')
      .send(newUser)
      .then(function(res){
        const email = newUser.email;
        const pwd  = newUser.password;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        return users.findOne({email})
      })
      .then(function(user){
        expect(user).to.not.be.null;
        expect(user.email).to.equal(email);
        return user.validatePassport(pwd);
      })
      .then(function(isValidPassword){
        expect(passwordIsCorrect).to.be.true;
      })
      .catch(function(err){
        if(err instanceof chai.AssertionError) {
            throw err;
        }
      })
      
    })

  })

  describe('PUT', function(){
    it('should upate the email user', function(){
      //TODO
      const UpdateUser = {  
        title: "Assistant Professor",
        userName: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        },
        tel: faker.phone.phoneNumber,
        region: "North America",
        country: faker.address.country(),
        state: faker.address.state(),
        university: "New Mexico State University",
        department: "Computer Science",
        researchSum: faker.lorem.sentence(),
        biography: faker.lorem.sentence(),
        img: faker.image.imageUrl,
        link: {
          link1: "",
          link2: ""
        }
      };

      return chai.request(app)
      .get('/api/users')
      .then(function(res){
        expect(res).to.have.status(200);
        UpdateUser.id = res.body.users[0].id;
        return chai.request(app)
        .put('/api/users/'+res.body.users[0].id)
        .send(UpdateUser);
      })
      .then(function(res){
        expect(res).to.have.status(204);
      })
    })
  })
    

  describe('DELETE', function(){
    it('should delete the first user in the list', function(){
        //TODO
        return chai.request(app)
        .get('/api/users')
        .then(function(res){
          return chai.request(app)
          .delete('/api/users/'+res.body.users[0].id);
        })
        .then(function(res){
          expect(res).to.have.status(200);
        });
    })
  })
})