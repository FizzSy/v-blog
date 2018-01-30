var articleSchema = require('../mongodb/articles.js');
var userSchema = require('../mongodb/users.js');
var msgSchema = require('../mongodb/msg.js');
var checknotlogin = require('./checklogin.js').checknotlogin;
var exp = require('express');
var router = exp.Router();

router.post('/save',function(req,res){
	userSchema.findById(req.body._id,function(err,data){ //只找到唯一的id，不是数组
		var obj = {
			_id:data._id+'',
			username: data.username,
			sex: data.sex,
			headicon:data.headicon,
			resume: data.resume
		}

		var acticle = new articleSchema({
			title:req.body.title,
			context:req.body.context,
			time:new Date(),
			author:obj,
			browse:0,
			message:0
		});	
		
		acticle.save(function(err,result){
			if(err){
				return res.send('发表失败...');
			}
			res.redirect('/personal/'+result._id); //跳到刚刚发表文章的个人页面
		})	
	})
})

router.post('/savenote',function(req,res){
	userSchema.findById(req.body._id,function(err,data){ //只找到唯一的id，不是数组
		var obj = {
			_id:data._id+'',
			username: data.username,
			headicon:data.headicon,
		}

		var msg = new msgSchema({
			note:req.body.note,
			time:new Date(),
			author:obj,
			aid:req.body.aid  		//存放文章的id
		});	
		
		msg.save(function(err){
			if(err){
				return res.send('发表失败...');
			}
			res.redirect('/personal/'+req.body.aid); //跳到刚刚发表文章的个人页面 
		})	
	})
})

router.get('/edit/:id',function(req,res){
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;	
	var id = req.params.id;
	articleSchema.findById(id,function(err,data){
		res.render('edit',{euser:data});
	})
})

router.post('/edit_save/',function(req,res){
	var id = req.body._id;
	var title = req.body.title;
	var context = req.body.context;
	articleSchema.findByIdAndUpdate(id,{$set:{title:title,context:context}},function(err,data){
		res.redirect('/personal/'+data.id);
	})
})

router.get('/delmsg/:id',function(req,res){
	var id = req.params.id;
	articleSchema.findByIdAndRemove(id,function(err,data){
		res.redirect('/');
	})
})

router.get('/delnote/:id',function(req,res){
	var id = req.params.id;
	msgSchema.findByIdAndRemove(id,function(err,data){
		res.redirect('/personal/'+data.aid);
	})
})

router.get('/',checknotlogin,function(req,res){
	res.render('publish');
})

module.exports = router;