var mongoose = require('../mongodb/db.js');

var userSchema = mongoose.Schema({
	username:String,
	password:String,
	sex:String,
	headicon:String,
	resume:String,
	num:Number
},{collection:'users'});

module.exports = mongoose.model('users',userSchema);
