var express = require('express');
var router = express.Router();
var db = require('../mongoDB/userQueries');

/* get user */
router.get('/user/:id', function (req, res, next) {
	let user = db.getUser(req.params.id);
	res.send(user);
});

/* get user */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
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