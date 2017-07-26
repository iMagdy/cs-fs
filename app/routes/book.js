var Book = require('../models/book');

module.exports = {
	list: function (req, res, query) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		Book.find(query, function(err, books) {
			res.json(books);
		});
	},
	find: function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		Book.findById(req.params.title, function(err, book) {
			res.json(book);
		});
	}
}