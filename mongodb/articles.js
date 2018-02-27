var mongoose = require('../mongodb/db.js');

var userSchema = mongoose.Schema({
	title:String,
	context:String,
	time:Date,
	author:Object,
	browse:Number,
	message:Number,
	rank:Number,
},{collection:'articles'});

module.exports = mongoose.model('articles',userSchema);
