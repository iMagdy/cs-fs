process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Book = require('./app/models/book');
let User = require('./app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');
let should = chai.should();

chai.use(chaiHttp);


let userToken = "", adminToken = "";

describe('Users', () => {
	before((done) => {
		userToken = "";
		adminToken = "";
		User.remove({}, (err) => {
			done();
		});
	});

	describe('/POST user', () => {
		it('it should not POST a user without password', (done) => {
	    	let user = {
    	        name: "user1",
        	}
	        chai.request(server)
    	        .post('/api/signup')
        	    .send(user)
        		.end((err, res) => {
	            	res.should.have.status(200);
    	    	    res.body.should.be.a('object');
        	    	res.body.should.have.property('errors');
        		    res.body.errors.should.have.property('password');
            		res.body.errors.password.should.have.property('kind').eql('required');
	        	    done();
    	    	});
    	});
    
	    it('it should POST a user ', (done) => {
    	    let user = {
        	    name: "user1",
           		password: "pass1",
	       	}
    	    chai.request(server)
        	   	.post('/api/signup')
           		.send(user)
	           	.end((err, res) => {
    	           	res.should.have.status(200);
        	       	res.body.should.be.a('object');
            	   	res.body.should.have.property('message').eql('User saved successfully');
              		done();
	           	});
    	});
	});

	describe('/POST admin', () => {
		it('it should not POST an admin without password', (done) => {
	    	let user = {
    	        name: "admin",
        	}
	        chai.request(server)
    	        .post('/api/admin/signup')
        	    .send(user)
        		.end((err, res) => {
	            	res.should.have.status(200);
    	    	    res.body.should.be.a('object');
        	    	res.body.should.have.property('errors');
        		    res.body.errors.should.have.property('password');
            		res.body.errors.password.should.have.property('kind').eql('required');
	        	    done();
    	    	});
    	});
    
	    it('it should POST a user ', (done) => {
    	    let user = {
        	    name: "admin",
           		password: "adminpass",
	       	}
    	    chai.request(server)
        	   	.post('/api/admin/signup')
           		.send(user)
	           	.end((err, res) => {
    	           	res.should.have.status(200);
        	       	res.body.should.be.a('object');
            	   	res.body.should.have.property('message').eql('User saved successfully');
              		done();
	           	});
    	});
	});

	describe('/POST authenticate user', () => {
		it('it should not authenticate user without password', (done) => {
			chai.request(server)
			.post('/api/authenticate')
			.send({name: 'user1'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('it should authenticate user and return user token', (done) => {
			chai.request(server)
			.post('/api/authenticate')
			.send({name: 'user1', password: 'pass1'})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('token');
				res.body.token.should.be.a('string');
				userToken = res.body.token;
				done();
			});
		});
	});

	describe('/POST authenticate admin', () => {
		it('it should not authenticate admin without password', (done) => {
			chai.request(server)
			.post('/api/admin/authenticate')
			.send({name: 'admin'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
		});

		it('it should authenticate admin and return admin token', (done) => {
			chai.request(server)
			.post('/api/admin/authenticate')
			.send({name: 'admin', password: 'adminpass'})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('token');
				res.body.token.should.be.a('string');
				adminToken = res.body.token;
				done();
			});
		});
	});
});


describe('Books', () => {
	beforeEach((done) => {
		Book.remove({}, (err) => {
			done();
		});
	});


	describe('/GET reader book', () => {
		it('it should not GET all the books without user token', (done) => {
			chai.request(server)
				.get('/api/books')
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('No token provided');
					done();
				});
		});

		it('it should not GET all the books with invalid user token', (done) => {
			chai.request(server)
				.get('/api/books')
				.set('x-access-token', 'hi')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Failed to authenticate token');
					done();
				});
		});

		it('it should GET all the books', (done) => {
			chai.request(server)
				.get('/api/books')
				.set('x-access-token', userToken)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});


	describe('/GET admin book', () => {
		it('it should not GET all the books without admin token', (done) => {
			chai.request(server)
				.get('/api/admin/books')
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('No token provided');
					done();
				});
		});

		it('it should not GET all the books with invalid admin token', (done) => {
			chai.request(server)
				.get('/api/admin/books')
				.set('x-access-token', 'hi')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Failed to authenticate token');
					done();
				});
		});

		it('it should GET all the books', (done) => {
			chai.request(server)
				.get('/api/admin/books')
				.set('x-access-token', adminToken)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});


	describe('/POST book', () => {
		it('it should not POST a book without authors property', (done) => {
	    	let book = {
    	        title: "The Lord of the Rings",
        	    category: "Novel"
        	}
	        chai.request(server)
    	        .post('/api/admin/addBook')
    	        .set('x-access-token', adminToken)
        	    .send(book)
        		.end((err, res) => {
	            	res.should.have.status(200);
    	    	    res.body.should.be.a('object');
        	    	res.body.should.have.property('errors');
        		    res.body.errors.should.have.property('authors');
            		res.body.errors.authors.should.have.property('kind').eql('required');
	        	    done();
    	    	});
    	});
    
	    it('it should POST a book ', (done) => {
    	    let book = {
        	    title: "The Lord of the Rings",
           		category: "Novel",
           		authors: ["J.R.R. Tolkien"]
	       	}
    	    chai.request(server)
        	   	.post('/api/admin/addBook')
        	   	.set('x-access-token', adminToken)
           		.send(book)
	           	.end((err, res) => {
    	           	res.should.have.status(200);
        	       	res.body.should.be.a('object');
            	   	res.body.should.have.property('message').eql('Book saved successfully');
              		done();
	           	});
    	});
	});


	describe('/GET/:id book', () => {
      	it('it should GET a book by the given id', (done) => {
        	let book = new Book({ _id: "The Lord of the Rings", category: "Novel", authors: ["J.R.R. Tolkien"]});
	        book.save((err, book) => {
    	        chai.request(server)
        	    	.get('/api/books/' + book._id)
        	    	.set('x-access-token', userToken)
            		.send(book)
	            	.end((err, res) => {
    	            	res.should.have.status(200);
    	    	        res.body.should.be.a('object');
        	    	    res.body.should.have.property('_id').eql(book.id);
            	    	res.body.should.have.property('category');
    	        	    res.body.should.have.property('authors');
            			done();
	            	});
    	    });

      	});
	});

	describe('/GET/:id book', () => {
      	it('it should GET a book by the given id', (done) => {
        	let book = new Book({ _id: "The Lord of the Rings", category: "Novel", authors: ["J.R.R. Tolkien"]});
	        book.save((err, book) => {
    	        chai.request(server)
        	    	.get('/api/admin/book/' + book._id)
        	    	.set('x-access-token', adminToken)
            		.send(book)
	            	.end((err, res) => {
    	            	res.should.have.status(200);
    	    	        res.body.should.be.a('object');
        	    	    res.body.should.have.property('_id').eql(book.id);
            	    	res.body.should.have.property('category');
    	        	    res.body.should.have.property('authors');
            			done();
	            	});
    	    });

      	});
	});

	describe('/POST/ id book', () => {
      it('it should UPDATE a book given the id', (done) => {
        let book = new Book({_id: "The Chronicles of Narnia", category: "Novel", authors: ["C.S. Lewis"]})
        book.save((err, book) => {
        	chai.request(server)
    	        .post('/api/admin/updateBook')
    	        .set('x-access-token', adminToken)
        	    .send({title: "The Chronicles of Narnia", authors: ["C.S. Lewis", "C.S. Lewis2"]})
        		.end((err, res) => {
	            	res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book updated successfully');
                    res.body.book.should.have.property('authors').eql(["C.S. Lewis", "C.S. Lewis2"]);
	        	    done();
    	    	});
          	});
      	});
  	});

  	describe('/DELETE/:id book', () => {
      it('it should DELETE a book given the id', (done) => {
        let book = new Book({_id: "The Chronicles of Narnia", category: "Novel", authors: ["C.S. Lewis"]})
        book.save((err, book) => {
                chai.request(server)
                .delete('/api/admin/book/' + book._id)
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book deleted successfully');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                  	done();
                });
          });
      });
  });
});