var Book = require('../models/book');

module.exports = {
	list: function (req, res) {
		Book.find({}, function(err, books) {
			res.json(books);
		});
	},
	find: function(req, res) {
		Book.findById(req.params.title, function(err, book) {
			res.json(book);
		});
	}
}