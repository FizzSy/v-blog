var exp = require('express');
var router = exp.Router();
var articleSchema = require('../mongodb/articles.js');	//数据库
var userSchema = require('../mongodb/users.js');
var msgSchema = require('../mongodb/msg.js'); 

router.get('/index/:index',function(req,res){				//渲染博客主页
	res.header('Access-Control-Allow-Origin','*'); //跨域请求
	if(!req.session.user){
		req.session.user = '';
	}
	var index = req.params.index;
	res.locals.user = req.session.user;  //将用户登录的数据传进来
	articleSchema.find({},function(err,info){
		var pages = Math.ceil(info.length/6);
		articleSchema.find({},function(err,data){
			res.render('blog',{users:data,pages:pages,index:index});
		}).sort({_id:-1}).skip(6*(index-1)).limit(6);
	});
})

router.get('/users/:uid',function(req,res){		//渲染个人用户页面
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;
	var uid = req.params.uid;			//用户的id
/*	var id = uid.split('*');
	var userId = id[0];
	var articleId = id[1];*/
/*	articleSchema.find({_id:articleId},function(err,data){		
		var obj = data[0];
		articleSchema.remove({_id:articleId},function(err,info){
			articleSchema.find({'author._id':uid},function(err,info2){
				info2.unshift(obj);
				console.log(info2+'111111')
				articleSchema.update({_id:articleId},{$set:obj},function(err,info3){
					//res.render('home',{home:info2});
				})
			});				
		})	
	})	*/		
	articleSchema.find({'author._id':uid},function(err,data){
		res.render('home',{home:data});
	}).sort({_id:-1})
})

router.get('/loginOut',function(req,res){		//登出
	req.session.user = null;
	res.redirect('/index/:index');
})	

router.use('/sign',require('./sign.js'));		//路由
router.use('/login',require('./login.js'));
router.use('/publish',require('./publish.js'));
router.use('/personal',require('./personal.js'));


module.exports = router;