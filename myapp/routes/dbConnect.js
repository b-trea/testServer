/* 디비 연결 */
// mysql 모듈 로딩
var mysql = require('mysql');
// Connection 객체 생성(Connection X)
var connection=mysql.createConnection({
	host : 'myinstance.cd4gvxnzywfs.ap-northeast-1.rds.amazonaws.com',
	port : 3306,
	user : 'mymaster',
	password : 'mymaster',
	database : 'mymariadb',
});

//* DB connection!
connection.connect(function(err){
	if(err){
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
	console.log("connect mariaDB!")
});
// */

exports.connection = connection;
