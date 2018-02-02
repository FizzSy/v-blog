var userSchema = require('../mongodb/users.js');
var exp = require('express');
var router = exp.Router();
var multer = require('multer');
var crypto = require('crypto');

var storage = multer.diskStorage({ 			//上传头像
	destination:function(req,file,cb){
		cb(null,'public/imgs') 				//将上传图片存入的目标文件夹
	},
	filename:function(req,file,cb){
		var fileFormat = (file.originalname).split('.');		//由于存入后文件名是绝对路径 故需要修改文件名 取最后一位
		cb(null,Date.now()+'.'+fileFormat[fileFormat.length-1]);
	}
})

var upload = multer({storage:storage});

router.get('/',function(req,res){
	res.render('sign');
})

router.post('/save_info',upload.single('file'),function(req,res){
	var user = new userSchema({
	username:req.body.username,
	password:crypto.createHmac('sha256',req.body.password).update('I LOVE CUPCAKES').digest('hex'),
	sex:req.body.sex,
	headicon:req.file.filename,
	resume:req.body.resume
	});
	user.save(function(err,data){			//将用户信息存入mongodb数据库
		if(err){
			return res.send('注册失败...');
		}
		var _user={
			_id : data._id,
			username : data.username,
			sex : data.sex,
			headicon : data.headicon,
			resume : data.resume
		}
		req.session.user = _user;  			//获取登录的数据
		res.locals.user = req.session.user;
		res.redirect('/');
	})	
})

router.get('/checkname',function(req,res){  //检测用户名是否被注册
	var username = req.query.username;
	userSchema.find({username:username},function(err,data){
		if(data.length>0){
			res.send(false);
		}else{
			res.send(true);
		}
	})
})

module.exports = router;