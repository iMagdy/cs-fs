var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var User = require('./app/models/user');

var config = require('./config');
var userRoute = require('./app/routes/user');

var port = process.env.PORT || 3000;

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {useMongoClient: true});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

var apiRoutes = express.Router();
var userRoutes = express.Router();

app.set('superSecret', config.secret);
app.set('adminSecret', config.admin);

userRoute(app, apiRoutes);


userRoutes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			console.log(1);
			console.log(token);

			if (err) {
				console.log(2);
				jwt.verify(token, app.get('adminSecret'), function(err, decoded) {
					console.log(3);
					if (err) {
						console.log(4);
						console.log('Failed to authenticate token');
						return res.json({success: false, message: 'Failed to authenticate token'});
					}

					req.decoded = decoded;
					next();
				});
			
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		console.log('No token provided');
		return res.status(403).send({success: false, message: 'No token provided'});
	}
});


// Admin


/*adminRoutes.post('/authenticate', function(req, res) {
	Admin.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (!admin) {
			res.json({ success: false, message: 'Authentication failed. User not found'});
			console.log('Authentication failed. Admin not found');
		} else if (user) {
			bcrypt.compare(req.body.password, user.password, function(err, resp) {

				if (err) throw err;

				if (resp) {
					var token = jwt.sign(user, app.get('adminSecret'), {
						expiresIn: 30
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
});*/


/*adminRoutes.use(function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, app.get('adminSecret'), function(err, decoded) {
			if (err) {
				return res.json({success: false, message: 'Failed to authenticate token'});
				console.log('Failed to authenticate token');
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({success: false, message: 'No token provided'});
		console.log('No token provided');
	}
});

adminRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});*/

userRoutes.get('/', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

app.use('/api', apiRoutes);
app.use('/api/reader', userRoutes);
app.listen(port);
console.log('Miracles happen');