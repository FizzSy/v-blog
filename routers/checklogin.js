module.exports = {
	checkislogin(req,res,next){		//检查登录状态，是登录则到首页，不是则跳到登录 登录状态下跳转到login用到此条件
		if(!req.session.user){  	//未登录状态
			return res.render('login');  //中间件的函数需要加上 return 不然影响接下来的回调函数
		}else{
			return res.redirect('/index/1');
		}
		next(); //把权限交给下一个		
	},
	checknotlogin(req,res,next){		//检查未登录状态,如果没有登录就跳转到登录界面
		res.locals.user = req.session.user;
		if(!req.session.user){  		//未登录状态
		return res.redirect('/login');
		}
		next(); //把权限交给下一个	
	}	
}