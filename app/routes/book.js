var Book = require('../models/book');

module.exports = {
	list: function (req, res, query) {
		Book.find(query, function(err, books) {
			res.json(books);
		});
	},
	find: function(req, res) {
		Book.findById(req.params.title, function(err, book) {
			res.json(book);
		});
	}
}