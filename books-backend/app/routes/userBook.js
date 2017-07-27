var Book = require('./book');

module.exports = function(bookRoutes) {
	
	bookRoutes.get('/', function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if (req.query.title){
			req.query._id = req.query.title;
			delete req.query.title;
		}

		Book.list(req, res, req.query)
	});

	bookRoutes.get('/:title', function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		Book.find(req, res);
	});
}