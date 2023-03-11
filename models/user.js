var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String, 
    email: String,
    password: String,
    cpassword:String
});
// Compile model from schema
var userModel = mongoose.model('users', userSchema );

module.exports = userModel;