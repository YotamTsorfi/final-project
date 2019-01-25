var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = require('../mongoDB/mongoQuerys');

/* update numOfTrees */
router.get('/bikes', function (req, res, next) {
	let bikes = db.mongoDBCon();
	console.log(typeof bikes);
});

/* GET rangerse. */
router.get('/rangers/', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

/* DELETE ranger */
router.delete('/rangers/', function(req, res, next) {

	let myquery = { id: req.body.id };

    db.collection("tasks").deleteOne(myquery, function(err, obj) {
		if (err) throw err;
		console.log("ranger  ${req.body.id} has been deleted");
		db.close();
	  });
	  
});

/* POST report trees */
router.post('/ranger',function(req,res) {

    db.tasks.findAndModify({
		query: { id: req.body.id},
		update: { $set: { numOfTrees: req.body.numOfTrees } },
		new: true
	}, function (err, doc, lastErrorObject) {
		// doc.tag === 'maintainer'
	})
    res.send(req.body);
});

// to proceed in new page
module.exports = router;