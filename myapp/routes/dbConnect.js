/* 디비 연결 */
// mysql 모듈 로딩
var mysql = require('mysql');
// Connection 객체 생성(Connection X)
/*
var dbInfo = {
	host : '127.0.0.1',
	port : 3306,
	user : 'root',
	password : 'mymariadb',
	database : 'boardtest',
};
//  */
//*
var dbInfo = {
	host : 'myinstance.cd4gvxnzywfs.ap-northeast-1.rds.amazonaws.com',
	port : 3306,
	user : 'mymaster',
	password : 'mymaster',
	database : 'mymariadb',
};
//  */


var connection=mysql.createConnection(dbInfo);



//* DB connection!
connection.connect(function(err){
	if(err){
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
	console.log("connect mariaDB!  :: " + dbInfo.database);


//	if()
	checkMyPushTable('regId');
});
// */


function checkMyPushTable(tableName){
	var strQuery = "show tables from " + dbInfo.database + " like '" + tableName + "';";
	
	var query = connection.query(strQuery,function(err,rows){

		if(err){
			console.log("Fail check table!");
        	console.log(err);
		}

        if(rows.length == 0){
        	console.log("Creating ["+tableName+"] Table....");

        	if('regId' == tableName){
        		strQuery = 'create table regId( id INT NOT NULL AUTO_INCREMENT, senderId TEXT NOT NULL, regId TEXT NOT NULL, PRIMARY KEY (id));';
        	}

        	connection.query(strQuery, function(err){
        		if(err){
        			console.log("Fail creating table!");
        			console.log(err);

        			return ;
        		}
        	});
        }
    });
}




exports.connection = connection;
