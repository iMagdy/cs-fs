var Book = require('../models/book');
var bookDefault = require('./book');


module.exports = function(adminRoutes) {

	adminRoutes.get('/books', function(req, res) {
		bookDefault.list(req, res, {});
	});

	adminRoutes.get('/book/:title', function(req, res) {
		bookDefault.find(req, res);
	});

	adminRoutes.post('/addBook', function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		if (!req.body || req.body.title && req.body.title.length === 0 || req.body.category && req.body.category.length === 0 || req.body.authors && (!Array.isArray(req.body.authors) || req.body.authors.length === 0)) return res.sendStatus(400);

		//console.log(req.body);
		if (req.body['authors[]']) {
			req.body['authors'] = req.body['authors[]'];
			delete req.body['autors[]'];
		}

		Book.findById(req.body.title, function(err, book) {
			if (err) return res.send(err);

			if (!book) {
				var book = new Book({
					_id: req.body.title,
					category: req.body.category,
					authors: req.body.authors
				});

				book.save(function(err){
					if (err) return res.send(err);

					console.log('Book saved successfully');
					res.json({success: true, message: "Book saved successfully"});
				});
			} else if (book) {
				console.log("Book already exists")
				res.json({success: false, message: "Book already exists"});
			}
		});
	});

	adminRoutes.post('/updateBook', function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		if (!req.body || req.body.title && req.body.title.length === 0 || req.body.category && req.body.category.length === 0 || req.body.authors && (!Array.isArray(req.body.authors) || req.body.authors.length === 0)) return res.sendStatus(400);

		if (req.body['authors[]']) {
			req.body['authors'] = req.body['authors[]'];
			delete req.body['autors[]'];
		}
		
		var alt = {_id: req.body.title};
		if (req.body.category)
			alt.category = req.body.category;
		if (req.body.authors)
			alt.authors = req.body.authors;

		Book.findById({_id: req.body.title}, (err, book) => {
			if (err) return res.send(err);

			Object.assign(book, req.body).save((err, book) => {
				if (err) return res.send(err);

				res.json({success: true, message: "Book updated successfully", book: book});
			});
		});
	});

	adminRoutes.delete('/book/:id', function(req, res) {
		//res.header("Access-Control-Allow-Origin", "*");
  		//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
		Book.remove({_id: req.params.id}, function(err, doc) {
			if (err) return res.send(err);
			console.log('Book deleted successfully');
    		res.json({success: true, message: "Book deleted successfully", result: doc});
		});
	});
}