$(function(){
	var username,password,repassword,personal,headicon;
	$('#username').blur(function(){
		users();
		if($('#resume').val()!='')
		check();
	})
	$('#password').blur(function(){
		users();
		checkpwd();
		if($('#repassword').val()!='')
		recheckpwd();
		if($('#resume').val()!='')
		resume();
		check();
	})	
	$('#repassword').blur(function(){
		users();
		recheckpwd();
		if($('#resume').val()!='')
		resume();
		check();
	})	
	$('#resume').focus(function(){
		console.log(1)
	})		
	$('#resume').blur(function(){
		resume();	
		check();
	})	
	$('.submit').click(function(){
		$.ajax({
			type:'post',
			url:'/login/check',
			data:{
				loginname:$('.loginname').val(),
				loginpwd:$('.loginpwd').val()
			},
			success:function(data){
				if(!data){
					$('.checkid').stop().fadeIn().text('请输入正确的账号和密码！');
				}else{
					$('.loginuser').submit();
				}
			}
		})
	})
	$('.userInfo').hover(function(){
		$(this).find('.del').stop().fadeIn('fast');
	},function(){
		$(this).find('.del').stop().fadeOut('fast');
	})
	$('.note_user').click(function(){	
		if(note()){
			$('.noteMsg').fadeIn().text('请输入留言信息！');
		}else{
			$('.note_form').submit();
		}
	})
	$('.del').click(function(){
		var id = $(this).data('id');
		var user = $(this).parents('.user');
		var val = $('.message').attr('value');
		$.ajax({
			type:'get',
			url:'delnote/'+id,
			data:{},
			success:function(data){
				if(data){
					user.remove();
					$('.message span').text(val-1);
				}
			}
		})
	})		
	$('.user_head').popover();
	function users(){
		var user = $('#username').val();
		var re = /^\w{6,20}$/g;
		var rez = re.test(user);
		if(!rez){
			$('.check_user').stop().fadeIn().text('请输入正确的用户名且长度应为6-20位！');
			username = false;
		}else{
			$('.check_user').stop().fadeOut();
			username = true;
		}
		$.ajax({
			url:'/sign/checkname',
			data:{
				username:$('#username').val()
			},
			success:function(data){
				if(!data){
					$('.check_user2').stop().fadeIn().text('用户名已被注册！');
					username = false;
				}else{
					$('.check_user2').stop().fadeOut();
					username = true;
				}
			}
		})		
	}
	function checkpwd(){
		var pwd = $('#password').val();
		var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g;
		var rez = re.test(pwd);
		if(!rez){
			$('.check_pwd').fadeIn().text('密码应有大小写字母数字且长度应位6-20位！');
			password = false;
		}else{
			$('.check_pwd').fadeOut();
			password = true;
		}		
	}
	function recheckpwd(){
		var repwd = $('#repassword').val();
		var pwd = $('#password').val();
		if(pwd!=repwd){
			$('.check_repwd').fadeIn().text('两次密码输入不一致！');
			repassword = false;
		}else{
			$('.check_repwd').fadeOut();
			repassword = true;
		}	
	}	
	function resume(){
		var resume = $('#resume').val();
		var re = /\S/g;
		var rez = re.test(resume);
		if(!rez){
			$('.resume').fadeIn().text('请输入个人简介！');
			personal = false;
		}else{
			$('.resume').fadeOut();
			personal = true;
		}			
	}
	function note(){
		var resume = $('#note').val();
		var re = /\S/g;
		var rez = re.test(resume);
		if(!rez){
			return true;
		}else{
			$('.noteMsg').fadeOut();
			return false;
		}			
	}	
	function check(){
		if(username&&password&&repassword&&personal&&$('#file').val()!=''){
			$('.sign').removeClass('disabled').prop('type','submit');
		}else{
			$('.sign').addClass('disabled').prop('type','button');
		}
	}
})