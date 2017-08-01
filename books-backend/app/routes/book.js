var Book = require('../models/book');

module.exports = {
	list: function (req, res, query) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if (query.authors && Array.isArray(query.authors)) {
			query.authors = {$all: query.authors};
		}

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
	},
	findByAuthors (req, res, query) {
		Book.find().all(query, function(err, books) {
			return books;
		})
	}
}