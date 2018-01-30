var mongoose = require('../mongodb/db.js');

var userSchema = mongoose.Schema({
	username:String,
	password:String,
	sex:String,
	headicon:String,
	resume:String
},{collection:'users'});

module.exports = mongoose.model('users',userSchema);
