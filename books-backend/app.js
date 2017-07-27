var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors')

var User = require('./app/models/user');
var config = require('./config');
var userRoute = require('./app/routes/user');
var userBook = require('./app/routes/userBook');
var adminBook = require('./app/routes/adminBook');

var port = process.env.PORT || 3000;

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {useMongoClient: true});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('dev'));

var apiRoutes = express.Router();
var bookRoutes = express.Router();
var adminRoutes = express.Router();

app.set('superSecret', config.secret);
app.set('adminSecret', config.admin);

userRoute(app, apiRoutes);


function authorize(req, res, next, secret) {
	//res.header("Access-Control-Allow-Origin", "*");
  	//res.header("Access-Control-Allow-Headers", "X-Access-Token, Origin, X-Requested-With, Content-Type, Accept");
	
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		console.log(req.headers);

	if (token) {
		jwt.verify(token, app.get(secret), function(err, decoded) {

			if (err) {
				console.log('Failed to authenticate token');
				return res.json({success: false, message: 'Failed to authenticate token'});
			}

			req.decoded = decoded;
			next();	
		});
	} else {
		console.log('No token provided');
		return res.status(403).send({success: false, message: 'No token provided'});
	}
}

bookRoutes.use(function(req, res, next) {
	authorize(req, res, next, 'superSecret');
});

adminRoutes.use(function(req, res, next) {
	authorize(req, res, next, 'adminSecret');
});

userBook(bookRoutes);
adminBook(adminRoutes)

app.use('/api', apiRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port);

module.exports = app;