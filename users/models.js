const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

//create a schema for the database
const univProfSchema = mongoose.Schema({
  title: {type:String, required:true},
  name: {
    firstName: {type: String, required:true},
    lastName: {type: String, required:true}
  },
  email: {type: String, required:true},
  password: {type: String, required:true},
  country: {type: String, required:true},
  state: {type: String, required:true},
  university: {type: String, required:true},
  department: {type: String, required:true},
  researchSum: String,
  tel: String,
  region: String,
  img: String,
  cv:  String,
  link:{link1:String, link2:String},
  created: {type:Date, default:Date.now}
})

univProfSchema.virtual('userName').get(function(){
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

univProfSchema.methods.apiRepr= function(){
  return {
    id : this._id,
    title: this.title,
    name: this.userName,
    email: this.email,
    tel: this.tel,
    password: this.password,
    region: this.region,
    country: this.country,
    state: this.state,
    university:this.university,
    department:this.department,
    researchSum: this.researchSum,
    img: this.img,
    cv: this.cv || "",
    link1:this.link.link1,
    link2: this.link.link2,
    created: this.created
  };

}

univProfSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

univProfSchema.methods.validatePasswordExpiration = function(password) {
    return (Date.now()- this.created)  //check on the password expiration
};

univProfSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const Users = mongoose.model('univprofs', univProfSchema);
module.exports = {Users};