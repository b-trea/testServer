var express = require('express');
var router = express.Router();


var dbConnection = require("./dbConnect");
var connection = dbConnection.connection;

var gcm = require('node-gcm');
var server_access_key = 'AIzaSyBjdJaYlt7iQDKqE5Vg5yrVIA2EXNKo2kI'; // API 키


router.post('/register', function(req, res, next){
	// DB Update
	console.log('[mypush] registering... ');
	console.log('-----');
	var regId = req.body.regId;
	var senderId = req.body.senderId;
	console.log('regId : ' + regId);
	console.log('senderId : ' + senderId);

	// DB data insert!
	var strQuery = "insert into regId (regId, senderId) values (?, ?);";
	var insertData = [regId, senderId];
	var query = connection.query(strQuery,insertData,function(err,rows){
		if(err){
	        	console.error("insert error!");
	        	console.error(err);
	        	res.json(err);
	        }

	        console.log('insert complete!');
	});
	res.end();
});

router.post('/unregister', function(req, res, next){
	// DB Delete
	console.log('[mypush] unregistering... ');


	var regId = req.body.regId;
	var senderId = req.body.senderId;

	var strQuery = "delete from regId where regId=? and senderId=?;";
	var insertData = [regId, senderId];
	var query = connection.query(strQuery,insertData,function(err,rows){
        if(err){
        	console.error("delete error!");
        	console.error(err);
        	res.json(err);
        }

        console.log('delete complete!');
    });

	res.end();
});

router.post('/send', function(req, res, next){
	// DB get regID and send message to regID
	console.log('[mypush] Preparing for Send Message... ');


	var senderId = req.body.senderId;
	var key1 = 'keyqwe';

	var message = new gcm.Message({
		collapseKey: 'demo',
		delayWhileIdle: true,
		timeToLive: 3,
		data: {
			title: "Test Message GCM",
			message: "메세지 수신 성공! " ,
			key3 : "message key 3"
		}
	});
//	message.addData('title', 'TestMessage');
//	message.addData('key3', 'message Key3');
	console.log("server key : " + server_access_key);	
	var sender = new gcm.Sender(server_access_key);

	var registrationIds = [];
	var rows = '';

	var strQuery = "select regId from regId where senderId='"+ senderId +"';";

	var query = connection.query(strQuery,function(err,rows){

		if(err){
			console.error("select error!");
	        	console.error(err);	        	
		}else{
			for(var i in rows){
				var rid = rows[i].regId;
//				rid = rid.replace(/(\s*)/g,"");
				console.log("push rid : " + rid);
				registrationIds.push(rid);
			}

			console.log("Sending Message...");

			sender.send(message, registrationIds, 4, function(err, result){
				if(err){
					console.error('Sending message ERROR!');
					console.error(err);
				}else{
					var r = result;
					console.log('Send result : \n',  r);
				}
			});

			console.log('send complete!!');
		}
    });


	res.end();
});

function printResult(log){
	console.log('Send Result : \n', log);

}


module.exports = router;
