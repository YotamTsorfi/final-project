var express = require('express');
var router = express.Router();
var db = require('../mongoDB/usersQueries');

/* get user */
router.get('/user/:id', async function (req, res, next) {
	let user = await db.getUser(req.params.id);
	res.send(user);
});

// to proceed in new page
module.exports = router;