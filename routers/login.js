var userSchema = require('../mongodb/users.js');
var exp = require('express'); 
var checkislogin = require('./checklogin.js').checkislogin;
var router = exp.Router();
var crypto = require('crypto');

router.post('/check',function(req,res){
	var username = req.body.loginname;
	var password = req.body.loginpwd;
	var pwd = crypto.createHmac('sha256',password).update('I LOVE CUPCAKES').digest('hex'); //加密
	userSchema.find({username:username,password:pwd},function(err,data){
		if(data.length>0){
			var _user={
				_id : data[0]._id,
				username : data[0].username,
				sex : data[0].sex,
				headicon : data[0].headicon,
				resume : data[0].resume
			}
			req.session.user = _user;  			//获取登录的数据
			res.locals.user = req.session.user;
			res.redirect('/index/1');
			console.log(pwd);	//加密后的密码 请求两次是ajax也请求了一次
		}else{
			res.send(false);
		}
	})	
})		

router.get('/',checkislogin,function(req,res){
	res.render('login');
})

module.exports = router;