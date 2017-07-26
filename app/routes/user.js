var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var User = require('../models/user');

function signup(req, res, admin) {
	//res.header("Access-Control-Allow-Origin", "*");
  	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	if (!req.body || !req.body.name || (req.body.name && req.body.name === "") || !req.body.password || (req.body.password && req.body.password === "")) return res.sendStatus(400);

	console.log(req.body.name);
	console.log(req.body.password);
	var saltRounds = 10;
	var pass = req.body.password;
	bcrypt.hash(pass, saltRounds, function(err, hash) {
		User.findById(req.body.name, function(err, user) {
			if (err) return res.send(err);

			if (!user) {
				var user = new User({
					_id: req.body.name,
					password: hash,
					admin: admin
				});

				user.save(function(err){
					if (err) return res.send(err);

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

function authenticate(req, res, secret, app) {
	//res.header("Access-Control-Allow-Origin", "*");
  	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	if (!req.body || !req.body.name || req.body.name && req.body.name === "" || !req.body.password || req.body.password && req.body.password === "") return res.sendStatus(400);

	User.findById(req.body.name, function(err, user) {
		//if (err) throw err;
		if (err) return res.send(err);

		if (!user || secret === 'superSecret' && user.admin  || secret === 'adminSecret' && !user.admin) {
			res.json({ success: false, message: 'Authentication failed. User not found'});
			console.log('Authentication failed. User not found');
		} else if (user && (secret === 'superSecret' && !user.admin || secret === 'adminSecret' && user.admin)) {

			bcrypt.compare(req.body.password, user.password, function(err, resp) {

				//if (err) throw err;
				if (err) return res.send(err);

				if (resp) {
					console.log('resp');
					var token = jwt.sign(user, app.get(secret), {
						expiresIn: 15 * 60
					}, { algorithm: 'ES512'});

					res.json({success: true, message: 'Authentication success', token: token});
					console.log('Authentication success');
				} else {
					res.json({success: false, message: 'Authentication failed. Wrong password'});
					console.log('Authentication failed. Wrong password');
				}
			});
		}
	});
}

module.exports = function (app, apiRoutes) {

	// Admin user signup
	apiRoutes.post('/admin/signup', function(req, res) {
		signup(req, res, true);
	});


	// Regular user signup
	apiRoutes.post('/signup', function(req, res) {
		signup(req, res, false);
	});

	// Both user and admin authentication
	apiRoutes.post('/admin/authenticate', function(req, res) {
		authenticate(req, res, 'adminSecret', app);
		
	});

	apiRoutes.post('/authenticate', function(req, res) {
		authenticate(req, res, 'superSecret', app);
	})

}