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
			resume: data.resume,
			num:2
		}

		var acticle = new articleSchema({
			title:req.body.title,
			context:req.body.context,
			time:new Date(),
			author:obj,
			browse:0,
			message:0,
			rank:1
		});	
		
		acticle.save(function(err,result){
			if(err){
				return res.send('发表失败...');
			}
			res.redirect('/personal/'+result._id); //跳到刚刚发表文章的个人页面
		})	
	})
})

router.post('/savenote',function(req,res){		//发布留言
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

router.get('/edit/:id',function(req,res){			//判断编辑用户的文章
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;	
	var id = req.params.id;
	articleSchema.findById(id,function(err,data){
		res.render('edit',{euser:data});
	})
})

router.post('/edit_save/',function(req,res){		//保存编辑并更新文章
	var id = req.body._id;
	var title = req.body.title;
	var context = req.body.context;
	articleSchema.findByIdAndUpdate(id,{$set:{title:title,context:context}},function(err,data){
		res.redirect('/personal/'+data.id);
	})
})

router.get('/delmsg/:id',function(req,res){			//删除文章
	var id = req.params.id;
	articleSchema.findByIdAndRemove(id,function(err,data){
		res.redirect('/index/1');				
	})
})

router.get('/topmsg/:id',function(req,res){			//顶置文章
	var id = req.params.id;
	articleSchema.find({_id:id},function(err,data){		
		console.log(data+'........');
		res.redirect('/users/'+data[0].author._id+'*'+id);		
	})	
})

router.get('/',checknotlogin,function(req,res){
	res.render('publish');
})

module.exports = router;