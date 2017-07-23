var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var User = require('../models/user');

function signup(req, res, admin) {
	if (!req.body || req.body.name.length === 0 || req.body.password.length === 0) return res.sendStatus(400);

	var saltRounds = 10;
	var pass = req.body.password;
	bcrypt.hash(pass, saltRounds, function(err, hash) {
		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err) throw err;

			if (!user) {
				var user = new User({
					name: req.body.name,
					password: hash,
					admin: admin
				});

				user.save(function(err){
					if (err) throw err;

					console.log('User saved successfully');
					res.json({success: true, message: "User saved successfully"});
				});

			} else if (user) {
				console.log("User already exists")
				res.json({success: false, message: "User already exists"});
			}
		});
	});	
}

module.exports = function (app, apiRoutes) {

	// Admin user signup
	apiRoutes.post('/admin/signup', function(req, res) {
		signup(req, res, true);
	});


	// Regular user signup
	apiRoutes.post('/reader/signup', function(req, res) {
		signup(req, res, false);
	});

	// Both user and admin authentication
	apiRoutes.post('/authenticate', function(req, res) {
		if (!req.body || req.body.name === "" || req.body.password === "") return res.sendStatus(400);

		User.findOne({
			name: req.body.name
		}, function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found'});
				console.log('Authentication failed. User not found');
			} else if (user) {

				bcrypt.compare(req.body.password, user.password, function(err, resp) {

					if (err) throw err;

					if (resp) {
						console.log('resp');
						var token = jwt.sign(user, app.get(req.body.admin ? 'superSecret': 'adminSecret'), {
							expiresIn: 30
						}, { algorithm: 'ES512'});

						//console.log(token);

						res.json({success: true, message: 'Authentication success', token: token});
						console.log('Authentication success');
					} else {
						res.json({success: false, message: 'Authentication failed. Wrong password'});
						console.log('Authentication failed. Wrong password');
					}
				});
			}
		});
	});	

}