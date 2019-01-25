var express = require('express');
var router = express.Router();
var db = require('../mongoDB/mongoQuerys');

/* get bikes list */
router.get('/bikes', async function (req, res, next) {
	let bikes = await db.getBikes();
	res.send(bikes);
});

/* get bike by id */
router.get('/bike/:id', async function (req, res, next) {
	let bike = await db.getBike(req.params.id);
	res.send(bike);
});

/* update bike */
router.put('/bike/:id', async function (req, res, next) {
	console.log(req.body);
	let updatedBike = await db.updateBike(req.params.id, req.body);
	res.send(updatedBike);
});

// to proceed in new page
module.exports = router;