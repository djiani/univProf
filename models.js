const mongoose = require('mongoose');

//create a schema for the database

const univProfSchemna = mongoose.Schema({
  name: {
    firstName:{type: String, required:true},
    lastName:{type: String, required:true},
  },
  email: {type: String, required:true},
  password: {type: String, required:true},
  country: {type: String, required:true},
  state: {type: String, required:true},
  university: {type: String, required:true},
  speciality: {type: String, required:true},
  researchSum: type: String,
  created: {type:Date, default:Date.now}
})

univProfSchemna.virtual('userName').get(function(){
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

univProfSchemna.methods.aprRepr= function(){
  return {
    id : this._id,
    name: this.userName,
    email: this.email,
    password: this.password,
    country: this.country,
    state: this.state,
    speciality:this.speciality,
    researchSum: this.researchSum,
    created: this.created
  };

}

const UnivProf = mongoose.model('univprofs', univProfSchemna);
module.exports = {UnivProf};