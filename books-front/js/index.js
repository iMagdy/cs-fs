$(document).ready(function() {

    var books = [];
    var $books = $('#bookslist');

    function listBooks(books) {
        if (books.length > 0) {
            $.each(books, function(book) {
                $books.append('<li data-open="viewBookModel"  class="callout primary">' + books[book]._id + '</li>');
            });
        } else {
            $books.append('<li> No Books available </li>');
        }
    }

    function getBooks() {
        $.ajax({  
                type: "GET",
                url: "http://localhost:80/api/books",
                headers: {'x-access-token': window.localStorage.getItem('books-api-token')},
                success: function(dataString) { 
                    books = JSON.stringify(dataString);
                    console.log(books);
                    if (Array.isArray(dataString)){
                        console.log('hi');
                        $('.showlogin').hide();
                        $('.showlogout').show();
                        $books.empty();
                        listBooks(dataString);
                    } else{
                        window.localStorage.removeItem('books-api-token');
                        $('.showlogin').show();
                        $('.showlogout').hide();
                        $books.empty();
                        $books.append('<li><h3> Please login </h3></li>');
                    }
                    console.log(JSON.stringify(dataString));
                }, error: function(error) {
                    console.log(JSON.stringify(error));
                    window.localStorage.removeItem('books-api-token');
                    $('.showlogin').show();
                    $('.showlogout').hide();
                    $books.empty();
                    $books.append('<li><h3> Please login </h3></li>');
                }
            });
    }

    function checkLoggedIn() {
        if (window.localStorage.getItem('books-api-token')) {
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
        window.localStorage.removeItem('books-api-token');
        checkLoggedIn();
    });

    $('#usersignup').submit(function(event) {
    	event.preventDefault();
        var formData = {
            'name'              : $('input[name=username]').val() === ""? null : $('input[name=username]').val(),
            'password'             : $('input[name=password]').val() === ""? null : $('input[name=password]').val()
        };

        if (formData.name === "")
            formData.name = null;
        if (formData.password === "")
            formData.password = null;

        console.log(formData);
        $.ajax({  
        	type: "POST",  
    	  	url: "http://localhost:80/api/signup",  
        	data: formData,  
        	contentType: 'application/x-www-form-urlencoded',
    	    success: function(dataString) { 
                console.log('success');
                console.log(dataString);
                if (dataString.message){
                    if (dataString.message.indexOf("_id") !== -1) {
                        alert ('User validation failed: username is required.');
                        if (dataString.message.indexOf("password") !== -1)
                            alert ('User validation failed: password is required.')
                    } else 
                        alert(dataString.message); 
                }
	            //console.log(JSON.stringify(dataString));
        	}, error: function(error) {
                console.log(error);
                if (error.status === 0) {
                    alert('Ops, There is problem with our servers. Please try agsin later');
                } else if (error.status === 400){
                    alert('Please enter your username and password.');
                }
                getBooks();
        	}
    	});
    });

    $('#userlogin').submit(function(event) {
        event.preventDefault();

        var formData = {
            'name'              : $('input[name=username1]').val() === "" ? null : $('input[name=username1]').val(),
            'password'             : $('input[name=password1]').val() === "" ? null : $('input[name=password1]').val()
        };
        console.log(formData);

        $.ajax({  
            type: "POST",  
            url: "http://localhost:80/api/authenticate",  
            data: formData,  
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(JSON.stringify(dataString));
                if (dataString.success) {
                    window.localStorage.setItem('books-api-token', dataString.token);
                    alert('Welcome ' + formData.name);
                    getBooks();
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
            }
        });
    });

    $("#bookslist").delegate(".callout", "click", function(){

        $.ajax({  
            type: "GET",  
            url: "http://localhost:80/api/books/" + $( this )[0].innerText,
            headers: {'x-access-token': window.localStorage.getItem('books-api-token')},
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) { 
                console.log(dataString);
                document.getElementById('title1').innerText = 'Title: ' + dataString._id; 
                document.getElementById('category1').innerText = 'Category: ' + dataString.category;

                $('#authors1').empty();
                for (author in dataString.authors) {
                    console.log(dataString.authors[author]);
                    $('#authors1').append('<li>' + dataString.authors[author] + '</li>');
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

    $('#addAuthorSearch').on('click', function(event) {
        event.preventDefault();
        $('#searchAuthors').append('<input id="searchAuthor" class="searchAuthor" name="searchAuthor" type="text" placeholder="Author">');
    });


    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var query = "";

        if ($('input[name=searchTitle]').val() !== "")
            query = 'title=' + $('input[name=searchTitle]').val();
        console.log(query);

        if ($('input[name=searchCategory]').val() !== ""){
            if (query.length !== 0)
                query += '&';
            query += 'category=' + $('input[name=searchCategory]').val();
        }
        console.log(query);
        var flag = 0;
        $('.searchAuthor').each(function () {
            console.log($(this).val());
                if (query.length !== 0)
                    query += '&';
            if ($(this).val() !== ""){
                query += 'authors=' + $(this).val();
                flag += 1;
            }
                //authors.push($(this).val());
        });



        console.log(query);

        $.ajax({  
            type: "GET",  
            url: "http://localhost:80/api/books?" + query,
            headers: {'x-access-token': window.localStorage.getItem('books-api-token')},
            contentType: 'application/x-www-form-urlencoded',
            success: function(dataString) {
                $books.empty();
                books = dataString;

                listBooks(books);
                if (dataString.success) {
                    getBooks();
                } else {
                    if (dataString.errors)
                        console.log(dataString.errors);
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