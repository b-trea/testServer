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



module.exports = router;
