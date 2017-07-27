$(document).ready(function() {

    var books = [];
    var $books = $('#bookslist');

    function listBooks(books) {
        if (books.length > 0) {
            $.each(books, function(book) {
                $books.append('<li data-open="updateBookModel" class="callout primary">' + books[book]._id + '</li>');
            });
        } else {
            $books.append('<li> No Books available </li>');
        }
    }

    function getBooks() {
        $.ajax({  
                type: "GET",
                url: "http://localhost:80/api/admin/books",
                headers: {'x-access-token': window.localStorage.getItem('books-admin-api-token')},
                success: function(dataString) { 
                    books = JSON.stringify(dataString);
                    if (Array.isArray(dataString)){
                        $('.showlogin').hide();
                        $('.showlogout').show();
                        $books.empty();
                        listBooks(dataString);
                    } else{
                        window.localStorage.removeItem('books-admin-api-token');
                        $('.showlogin').show();
                        $('.showlogout').hide();
                        $books.empty();
                        $books.append('<li><h3> Please login </h3></li>');
                    }
                    console.log(JSON.stringify(dataString));
                }, error: function(error) {
                    console.log(error);
                    window.localStorage.removeItem('books-admin-api-token');
                    $('.showlogin').show();
                    $('.showlogout').hide();
                    $books.empty();
                    $books.append('<li><h3> Please login </h3></li>');
                }
            });
    }

    function checkLoggedIn() {
        if (window.localStorage.getItem('books-admin-api-token')) {
            getBooks();
        } else {
            $('.showlogin').show();
            $('.showlogout').hide();
            $books.empty();
            $books.append('<li><h3> Please login </h3></li>');
        }
    }

    checkLoggedIn();

    $('#showlogout').click(function() {
        window.localStorage.removeItem('books-admin-api-token');
        checkLoggedIn();
    });

    $('#adminsignup').submit(function(event) {
    	event.preventDefault();
        var formData = {
            'name'              : $('input[name=username]').val() === ""? null : $('input[name=username]').val(),
            'password'             : $('input[name=password]').val() === ""? null : $('input[name=password]').val()
        };

        console.log(formData);
        $.ajax({  
        	type: "POST",  
    	  	url: "http://localhost:80/api/admin/signup",  
        	data: formData,  
        	contentType: 'application/x-www-form-urlencoded',
    	    success: function(dataString) { 
                if (dataString.message)
                    alert(dataString.message); 
        	}, error: function(error) {
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Please enter your username and password.');
                }
                getBooks();
        	}
    	});
    });

    $('#adminlogin').submit(function(event) {
        event.preventDefault();

        var formData = {
            'name': $('input[name=username1]').val() === "" ? null : $('input[name=username1]').val(),
            'password' : $('input[name=password1]').val() === "" ? null : $('input[name=password1]').val()
        };
        console.log(formData);

        $.ajax({  
            type: "POST",  
            url: "http://localhost:80/api/admin/authenticate",  
            data: formData,  
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                if (dataString.success) {
                    window.localStorage.setItem('books-admin-api-token', dataString.token);
                    checkLoggedIn();
                    alert('Welcome ' + formData.name);
                } else {
                    if (dataString.message) {
                        alert(dataString.message);
                    }
                }
            }, error: function(error) {
                console.log(JSON.stringify(error));
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Please enter your username and password.');
                }
                //checkLoggedIn();
            }
        });
    });

    $('#addAuthor').on('click', function(event) {
        event.preventDefault();
        $('#authors').append('<input class="author" type="text" placeholder="Author">');
    });


    $('#addBook').submit(function(event) {
        event.preventDefault();

        var authors = [];

        $('.author').each(function () {
            console.log($(this).val());
            if ($(this).val() !== "")
                authors.push($(this).val());
        });

        console.log(authors);

        var formData = {
            title              : $('input[name=title]').val() === "" ? null : $('input[name=title]').val(),
            category             : $('input[name=category]').val() === "" ? null : $('input[name=category]').val(),
            authors: authors
        };
        console.log(formData);

        $.ajax({  
            type: "POST",  
            url: "http://localhost:80/api/admin/addBook",
            headers: {'x-access-token': window.localStorage.getItem('books-admin-api-token')},
            data: formData,  
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(JSON.stringify(dataString));
                if (dataString.success) {
                    alert(dataString.message);
                    getBooks();
                } else {
                    if (dataString.errors) {
                        if (dataString.errors._id)
                            alert('Field `title` is required');
                        if (dataString.errors.category)
                            alert(dataString.errors.category.message);
                        if (dataString.errors.authors)
                            alert(dataString.errors.authors.message);
                    } else 
                        alert(dataString.message);
                }
            }, error: function(error) {
                console.log(error);
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Session expired. Please login again.');
                }
                getBooks();
            }
        });
    });

    var booktitle, bookcategory, bookauthors; 


    $('#addAuthor1').on('click', function(event) {
        event.preventDefault();
        $('#authors1').append('<input class="author1" type="text" placeholder="Author">');
    });

    $("#bookslist").delegate(".callout", "click", function(){
        console.log($( this )[0].innerText);
        var x = $(this);

        $.ajax({  
            type: "GET",  
            url: "http://localhost:80/api/admin/book/" + $( this )[0].innerText,
            headers: {'x-access-token': window.localStorage.getItem('books-admin-api-token')},
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(dataString);
                document.getElementById('title1').innerText = dataString._id; 
                document.getElementById('category1').value = dataString.category;

                $('#authors1').empty();
                for (author in dataString.authors) {
                    console.log(dataString.authors[author]);
                    $('#authors1').append('<div id="authors1"><input class="author1" type="text" placeholder="Author" value="' + dataString.authors[author] + '"></div>');
                }

            }, error: function(error) {
                console.log(error);
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Session expired. Please login again.');
                }
                getBooks();
            }
        });
    });

    $('#updateBook').submit(function(event) {
        event.preventDefault();

        var authors = [];

        $('.author1').each(function () {
            console.log($(this).val());
            if ($(this).val() !== "")
                authors.push($(this).val());
        });

        console.log(authors);

        var formData = {
            title              : document.getElementById('title1').innerText,
            category             : $('input[name=category1]').val() === "" ? null : $('input[name=category1]').val(),
            authors: authors
        };
        console.log(formData);

        $.ajax({  
            type: "POST",  
            url: "http://localhost:80/api/admin/updateBook",
            headers: {'x-access-token': window.localStorage.getItem('books-admin-api-token')},
            data: formData,  
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(JSON.stringify(dataString));
                if (dataString.success) {
                    alert(dataString.message);
                    getBooks();
                } else {
                    if (dataString.errors) {
                        if (dataString.errors.category)
                            alert(dataString.errors.category.message);
                        if (dataString.errors.authors)
                            alert(dataString.errors.authors.message);
                    } else 
                        alert(dataString.message);
                }
            }, error: function(error) {
                console.log(error);
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Session expired. Please login again.');
                }
                getBooks();
            }
        });
    });

    $('#deleteBook').submit(function(event) {
        event.preventDefault();
        $.ajax({  
            type: "DELETE",  
            url: "http://localhost:80/api/admin/book/" + document.getElementById('title1').innerText,
            headers: {'x-access-token': window.localStorage.getItem('books-admin-api-token')},
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(JSON.stringify(dataString));
                if (dataString.success) {
                    alert(dataString.message);
                    getBooks();
                } else {
                    if (dataString.errors) {
                        if (dataString.errors.category)
                            alert(dataString.errors.category.message);
                        if (dataString.errors.authors)
                            alert(dataString.errors.authors.message);
                    } else
                        alert(dataString.message);
                }
            }, error: function(error) {
                console.log(error);
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Session expired. Please login again.');
                }
                getBooks();
            }
        });
    });

});