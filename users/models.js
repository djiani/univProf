const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

//create a schema for the database
const univProfSchema = mongoose.Schema({
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
  researchSum: String,
  created: {type:Date, default:Date.now}
})

univProfSchema.virtual('userName').get(function(){
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

univProfSchema.methods.apiRepr= function(){
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

univProfSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

univProfSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const Users = mongoose.model('univprofs', univProfSchema);
module.exports = {Users};