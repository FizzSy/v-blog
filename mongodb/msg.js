var mongoose = require('../mongodb/db.js');

var msgSchema = mongoose.Schema({
	aid:String,
	time:Date,
	author:Object,
	note:String
},{collection:'msgs'});

module.exports = mongoose.model('msgs',msgSchema);
