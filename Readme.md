## HOPEAZ DMS
[![Build Status](https://travis-ci.org/andela-hngerebara/Document-Management-System.svg?branch=master)](https://travis-ci.org/andela-hngerebara/Document-Management-System) [![Coverage Status](https://coveralls.io/repos/github/andela-hngerebara/Document-Management-System/badge.svg?branch=develop)](https://coveralls.io/github/andela-hngerebara/Document-Management-System?branch=develop)

A document management system (DMS) is a system (based on computer programs in the case of the management of digital documents)used to track, manage and store documents and reduce paper. It provides a restful API for users to create and manage documents giving different privileges based on user roles.

The developed application is a react redux based application based on RESTful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## Development

This application was developed using the following frameworks.

* NodeJs
* React Redux
* Express
* Sequelize as ORM

## Structure
---------------------------------------------------------------------------------------------------------------------------
```sh
├client                # Client-side/ front end
├── src                     # root folder    
│   ├── components           # All Components 
|   |   ├── admin            # admin folder component to manage users. Includes actions and it's reducer
│   │   ├── auth             # component folder for authentication. Has signup and checkin. Includes actions and it's reducer
│   │   ├── common           #Has all the common used components ex. Header, footer, sidebar, searchbar
│   │   ├── document         # document folder to manage all documents. Includes actions and it's reducer
│   │   ├── App.jsx              
│   │   ├── HomePage.jsx           
│   ├── reducers              # reducers 
│   │   ├── index.js          # imports allreducers used in the components
│   ├── store          
│   │   ├── ConfigureStore.js   # store configuration
│   ├── utils              
│   │   ├── api.js              # News articles store
│   │   ├── requireAuth.js      # News source store
│   │   ├── setAuthToken.js     # News source store
│   ├── validations             # Application Stores
│   │   ├── login.js            # Form Validations forlogin
│   │   ├── signup.js           #  Form Validations forsignup   
│   ├── index.js          
│   ├── routes.js                
│   ├── styles                 
│   │   ├── custom.scss           
└ server                   # Server-side
├── configs                       
│   ├── middlewares           
|   |   ├── adminVerification.js            
│   │   ├── auth.js           
│   ├── config.js            
│   ├── controllers         
│   │   ├── documents.js      # documents controller
│   │   ├── index.js          # imports all controllers
│   │   ├── roles.js          # roles controller
│   │   ├── search.js         # search controller
│   │   ├── users.js          # users controller
│   ├── models          
│   │   ├── documents.js      # document model
│   │   ├── index.js         
│   │   ├── roles.js          # roles model
│   │   ├── users.js          # users model
│   ├── routes                # Endpoint routes
│   │   ├── documents.js      # Document routes
│   │   ├── index.js          # All routes imported
│   │   ├── roles.js          # Document routes
│   │   ├── search.js         # search routes
│   │   ├── users.js          # users routes
│   ├── app.js                
│   ├── server.js            
└ tests                   # Tests
│   ├── client         
│   ├── server            
└

```

## Application Features
----------------------------------------------------------------------------------------------

### User Authentication

Users are authenticated and validated using passport js. JWT tokens are generated on signup and login  to ensure alldocuments and API endpoints are protected.

### Document Management

Users can: 
* Create an account
* Login with their valid credentials
* Create new document by specifying the document name, desciption of document access type and the content.
* Edit only their documents
* Delete their documents if not needed.
* View public documents created by other users.
* View documents created by his/her access group with access level set as role.
* Search public, private and role based documents.
* Logout

Admin user can:
* View all users.
* View all created documents except documents with access set to private.
* Delete any user.
* Search for any user.

## Installation
-----------------------------------------------------------------------------------------------
* Ensure that you have NodeJs and Postgres installed on your machine
* Clone the repository $ git clone https://github.com/andela-hngerebara/Document-Management-System.git
* Change into the directory $ cd doc-management
* Install all required dependencies with $ npm install

## Usage
-----------------------------------------------------------------------------------------------
* Run npm start to start the application on development environment


## Testing
* Run client test by running npm test:client
* Run server test by running npm test:server


## API Documentation

The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

## API Features

### Authentication

* It uses JSON Web Token (JWT) for authentication.

* It generates a token on successful login or account creation.

* It verifies the token to ensures a user is authenticated to access protected endpoints.

### Users
Can:
* Be Created.

* Login and obtain a token.

* Admin can manage users.

### Documents
Users can: 
* Create new documents.

* View all documents based on acces specified by creators.

* Create, retrieve, edit, and delete documents.

* Only delete, edit and update documents that belong to them.


### Search
Users can: 
* Search public, role and his/her private documents for based the search query.

Admin can: 
* Search public, role and his/her private documents based the search query.
* Search users based on username, first last names

## Limitations:
* Users can only create and retrieve textual documents.
* Users cannot share documents with people.
* Users cannot update their profile(working on it)

## Contribute
---------------------------------------------------------------------------------------------------------------------------

If you are interested in contributing to development of Hopeaz DMS, that's really great!

Follow the instructions below to contribute.

* Fork the repository

* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description

* Create a pull request

## FAQ
----------------------------------------------------------------------------------------------------------------------

1. What if I want to use another port?
That's easy. In the root of the project. create a file named .env and add the following line to it:

PORT=<your_desired_port>
where <your_desired_port> is the port you want to use. So, if you want to use port 8080, you will write:

PORT=8080

## Licence
----------------------------------------------------------------------------------------------------------------------

This project is authored by <a href="https://google.com/search?q=Hope+Ngerebara">Hope Ngerebara</a> and is licensed for your use, modification and distribution under the ISC license. 
