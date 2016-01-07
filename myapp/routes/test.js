var express = require('express');
var router = express.Router();

var dbConnection = require("./dbConnect");
var connection = dbConnection.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });

	var strQuery = 'select board.boardNo as boardNo, board.title as title, \
							board.insertId as insertId, board.insertDate as insertDate, \
							user.name as writerName \
					from board, user \
					where board.insertId = user.userId';
	
	var query = connection.query(strQuery,function(err,rows){
        console.log(rows);
        res.json(rows);
    });
});



module.exports = router;
