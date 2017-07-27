## Books Library

### Usage

For the back-end 

- Create a directory 'mongo' inside 'db' directory.
- Run `docker-compose up`

- First to compile Sass files:

        $ cd books-front
        $ npm install
        $ npm start


## Challenge description

This challenge will test your skills in the following areas:

- Node JS
- MongoDB
- Docker
- Docker compose
- Search

### Desc
Please design a microservices architecture, for a books library. It
should be made of the following containers:

- node.
- nginx.
- mongodb.

The nginx container should expose port 80, and the node container
should expose port 3000 internally, so only other microservices
can see it (that includes nginx).

Nginx should proxy requests coming into port 80 to port 3000 on the node
container.

### Node Container
Should have login, signup (username, password), after logging in,
we have 2 user roles:

- Reader
- Admin

Reader can search books by name, book category, and author name. So each
book should have the following info:

Each book have title, and one category, a book may be authored by mutiple
authors too.

Admin can CRUD books.


### Nginx
Proxy incoming requests on port 80 should be redirected to port 3000 on
node container.

### MongoDB
Any required indexes for performance and search.

### How to submit
- Fork this repo
- Issue a PR with a branch with your name

### Notes
- Use docker-compose.
- Use a front-end/css framework.
- You can build the app outside of docker if you couldn't do it in docker.
- Let me know if you need any help.
- 1 week
