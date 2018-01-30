var exp = require('express'); 
var router = exp.Router();
var articleSchema = require('../mongodb/articles.js');
var msgSchema = require('../mongodb/msg.js'); 

router.get('/:pid',function(req,res){
	if(!req.session.user){
		req.session.user = '';
	}	
	res.locals.user = req.session.user;
	var pid = req.params.pid;
	articleSchema.findById(pid,function(err,data1){
		msgSchema.find({aid:pid},function(err,result){
			articleSchema.findByIdAndUpdate(pid,{$set:{message:result.length,browse:data1.browse+1}},function(err,info){
				articleSchema.findById(pid,function(err,data){
					res.render('article',{msg:result,personal:data})
				})
			})			
		})
	}).sort({_id:-1});	
})

router.get('/delnote/:id',function(req,res){
	var id = req.params.id;
	msgSchema.findByIdAndRemove(id,function(err,data){
		msgSchema.find({aid:data.aid},function(err,result){
			articleSchema.findByIdAndUpdate(data.aid,{$set:{message:result.length}},function(err,info){
				res.send(true);
			})
		})
	})
})	

module.exports = router;