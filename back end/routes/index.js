var express = require('express');
var router = express.Router();
var SSH = require('simple-ssh');
const ipRegex = require('ip-regex');

// ---------------------- FUNCTIONS SECTION
function validation(ip) {
    return  ipRegex({exact: true}).test(ip);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/layout', function(req, res) {
    console.log("this is a post request");
});

module.exports = router;
