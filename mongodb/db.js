var mongoose = require('mongoose');
mongoose.connect('mongodb://172.16.6.54:27017/mydb'); //192.168.1.111 172.16.6.61
mongoose.connection.on('connected',function(){
	console.log('数据库连接成功...');
});

module.exports = mongoose;
