var express = require('express');
var router = express.Router();
var moment = require('moment');
var GPS = require('gps');


// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	var f = new Date();
	var cad = moment().format('LTS');
	res.render('index',{ hora: cad, dia: f});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.post('/', function(req, res){
	console.log("hola");
	//ejemplo para area
	var name = req.user.name; 
	var username = req.user.username;
	var email = req.user.email;//mail empleado
	var id = email.substring(0, email.indexOf("@")); //substring del email empleado
	var horaLocal = moment().format('LTS');// hora local
	var horaGMT = new Date(Date.UTC(96, 11, 1, 0, 0, 0));// hora GMT
	var gps = new GPS;
	gps.on('data', function() {
    console.log(data, gps.state);
});
	
});

module.exports = router;
