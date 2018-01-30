var express = require('express');
var app =express();
var router = require('./routers/index');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

app.use(express.static(path.join(__dirname,'./public')))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:'lu'}));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.use('/',router);
app.listen('80',function(){
	console.log('服务启动成功');
})