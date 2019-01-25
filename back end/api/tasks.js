var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://shimi:primenum13@ds259499.mlab.com:59499/mytasklist_brad', ['tasks']);

/* update numOfTrees */
router.get('/rangers/:id/:numOfTrees', function (req, res, next) {
	db.tasks.findAndModify({
		query: { id: req.params.id},
		update: { $set: { numOfTrees: req.params.numOfTrees } },
		new: true
	}, function (err, doc, lastErrorObject) {
		// doc.tag === 'maintainer'
	})
	res.send({id: req.params.id, numOfTrees: req.params.numOfTrees});
});

/* GET rangerse. */
router.get('/rangers/', function(req, res, next) {
	console.log("tasks");
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