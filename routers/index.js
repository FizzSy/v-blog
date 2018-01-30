var exp = require('express');
var router = exp.Router();
var articleSchema = require('../mongodb/articles.js');
var userSchema = require('../mongodb/users.js');
var msgSchema = require('../mongodb/msg.js'); 

router.get('/',function(req,res){
	if(!req.session.user){
		req.session.user = '';
	}
	res.locals.user = req.session.user;  //将用户登录的数据传进来
	articleSchema.find({},function(err,data){
		res.render('blog',{users:data});
	}).sort({_id:-1});
})

router.get('/users/:uid',function(req,res){
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;
	var uid = req.params.uid;
	articleSchema.find({'author._id':uid},function(err,data){
		res.render('home',{home:data});
	}).sort({_id:-1});	
})

router.get('/loginOut',function(req,res){
	req.session.user = null;
	res.redirect('/');
})

router.use('/sign',require('./sign.js'));
router.use('/login',require('./login.js'));
router.use('/publish',require('./publish.js'));
router.use('/personal',require('./personal.js'));


module.exports = router;