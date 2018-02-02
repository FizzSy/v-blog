var exp = require('express');
var router = exp.Router();
var articleSchema = require('../mongodb/articles.js');	//数据库
var userSchema = require('../mongodb/users.js');
var msgSchema = require('../mongodb/msg.js'); 

router.get('/',function(req,res){				//渲染博客主页
	res.header('Access-Control-Allow-Origin','*');
	if(!req.session.user){
		req.session.user = '';
	}
	res.locals.user = req.session.user;  //将用户登录的数据传进来
	articleSchema.find({},function(err,data){
		res.render('blog',{users:data});
	}).sort({_id:-1});
})

router.get('/users/:uid',function(req,res){		//渲染个人用户页面
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;
	var uid = req.params.uid;			//用户的id
	articleSchema.find({'author._id':uid},function(err,data){
		res.render('home',{home:data});
	}).sort({_id:-1});	
})

router.get('/loginOut',function(req,res){		//登出
	req.session.user = null;
	res.redirect('/');
})	

router.use('/sign',require('./sign.js'));		//路由
router.use('/login',require('./login.js'));
router.use('/publish',require('./publish.js'));
router.use('/personal',require('./personal.js'));


module.exports = router;