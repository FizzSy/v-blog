var exp = require('express');
var router = exp.Router();
var articleSchema = require('../mongodb/articles.js');	//数据库
var userSchema = require('../mongodb/users.js');
var msgSchema = require('../mongodb/msg.js'); 
var path = require('path');

router.get('',function(req,res){
	res.redirect('/index/1');
})

router.get('/index/:index',function(req,res){				//渲染博客主页
	res.header('Access-Control-Allow-Origin','*'); //跨域请求
	if(!req.session.user){
		req.session.user = '';
	}
	var index = req.params.index;
	res.locals.user = req.session.user;  //将用户登录的数据传进来
	articleSchema.find({},function(err,info){
		var pages = Math.ceil(info.length/6);
		var page_length = info.length;
		articleSchema.find({},function(err,data){
			res.render('blog',{users:data,pages:pages,index:index,user_length:page_length});
		}).sort({_id:-1}).skip(6*(index-1)).limit(6);
	});
})

router.get('/json',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	console.log(__dirname)
	res.sendFile(path.join(__dirname,'../public/data.json'));
})

router.get('/users/:uid',function(req,res){		//渲染个人用户页面
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;
	var uid = req.params.uid;			//用户的id
	articleSchema.find({'author._id':uid},function(err,data){
		res.render('home',{home:data});
	}).sort({newtime:-1})
})

router.get('/loginOut',function(req,res){		//登出
	req.session.user = null;
	res.redirect('/index/1');
})	

router.use('/sign',require('./sign.js'));		//路由
router.use('/login',require('./login.js'));
router.use('/publish',require('./publish.js'));
router.use('/personal',require('./personal.js'));


module.exports = router;