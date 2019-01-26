var express = require('express');
var router = express.Router();
var db = require('../mongoDB/transportQueries');

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
	let updatedBike = await db.updateBike(req.params.id, req.body);
	res.send(updatedBike);
});

/* delete bike */
router.delete('/bike/:id', async function (req, res, next) {
	let deleteBike = await db.deleteBike(req.params.id);
	res.send(deleteBike);
});


/* create bike */
router.post('/bike', async function (req, res, next) {
	let bike = await db.createBike(req.body);
	res.send(bike);
});


/* get near by bikes */
// TODO

// to proceed in new page
module.exports = router;