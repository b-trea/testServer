var express = require('express');
var router = express.Router();

var dbConnection = require("./dbConnect");
var connection = dbConnection.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });

	var strQuery = 'select * from testTable;';
	
	var query = connection.query(strQuery,function(err,rows){
        console.log(rows);
        res.json(rows);
    });
});

router.get('/insert', function(req, res, next) {
//  res.render('index', { title: 'Express' });

	var item = {
		'id' : req.body.id,
		'value' : req.body.value
	};

	var strQuery = 'insert into testTable set ?';
	
	var query = connection.query(strQuery,item,function(err,rows){
        if(err){
        	console.error(err);
        	connection.rollback(function () {
        		console.error('rollback error');
        	});
        }

        console.log('insert transaction log');
        
        connection.commit(function (err) {
        	if(err){
        		console.error(err);
        		connection.rollback(function () {
        			console.error('rollback error');
        		});
        	}

        	res.send(200, 'success');
        });
        
    });
});

module.exports = router;
