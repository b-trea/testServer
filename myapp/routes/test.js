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

	var id = Number(req.query.id);
	var value = req.query.value;

	var strQuery = "insert into testTable (id, value) values (?, ?);";
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
