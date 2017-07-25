var Book = require('./book');

module.exports = function(bookRoutes) {
	
	bookRoutes.get('/', function(req, res) {
		Book.list(req, res, req.query);
	});

	bookRoutes.get('/:title', function(req, res) {
		Book.find(req, res);
	});
}