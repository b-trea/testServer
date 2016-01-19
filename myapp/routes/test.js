var express = require('express');
var router = express.Router();

var dbConnection = require("./dbConnect");
var connection = dbConnection.connection;

var gcmPush = require("./gcmPush");
var message = gcmPush.message;
var sender = gcmPush.sender;
var registrationIds = gcmPush.registrationIds;
var sender = gcmPush.sender;

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//	res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
	var strQuery = 'select * from testTable2;';
	
	var query = connection.query(strQuery,function(err,rows){
        console.log(rows);
        res.json(rows);

	// push 
        sender.send(message, registrationIds, 4, function(err, result){
			console.log(result);
		});
        //

    });
});

router.post('/insert', function(req, res, next) {
//  res.render('index', { title: 'Express' });

	var id = Number(req.body.id);
	var value = req.body.value;
	console.log(id + " / " + value);
	var strQuery = "insert into testTable2 (id, value) values (?, ?);";
	var insertData = [id, value];
	var query = connection.query(strQuery,insertData,function(err,rows){
        if(err){
        	console.error(err);
        	res.json(err);
        }

        console.log('insert transaction log');
        
        res.json(req.body);
    });
});


module.exports = router;
