## HOPEAZ DMS
[![Build Status](https://travis-ci.org/andela-hngerebara/Document-Management-System.svg?branch=develop)](https://travis-ci.org/andela-hngerebara/Document-Management-System) [![Coverage Status](https://coveralls.io/repos/github/andela-hngerebara/Document-Management-System/badge.svg?branch=develop)](https://coveralls.io/github/andela-hngerebara/Document-Management-System?branch=develop)

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
 API documentation [here](https://hopeazdms.herokuapp.com/api-docs)

### API Features

#### Authentication

* It uses JSON Web Token (JWT) for authentication.

* It generates a token on successful login or account creation.

* It verifies the token to ensures a user is authenticated to access protected endpoints.

#### Users
Can:
* Be Created.

* Login and obtain a token.

* Admin can manage users.

#### Documents
Users can: 
* Create new documents.

* View all documents based on acces specified by creators.

* Create, retrieve, edit, and delete documents.

* Only delete, edit and update documents that belong to them.


#### Search
Users can: 
* Search public, role and his/her private documents for based the search query.

Admin can: 
* Search public, role and his/her private documents based the search query.
* Search users based on username, first last names

| EndPoint | Functionality |
| ------ | ------ |
| POST /users/login | Logs a user in. |
| POST /users/logout | Logs a user out. |
| POST /users | Creates a new user. |
| GET /users | Retrieves all users. |
| GET /search/users?search=query | Search the users based on search query |
| GET /users?limit=:num | Retrieves users based on the limit specified |
| GET /users?limit=:num&offset=:num | Retrieves users based on the limit and offset specified |
| GET /users/:id | Retrieves a single user |
| PUT /users/:id | Update a user's profile |
| DELETE /users/:id | Delete a single user |
| POST /documents/new | Create a new document |
| GET /documents | Retrieve all documents |
| GET /search/documents?search=q | Search the documents based on search query |
| GET /documents?limit=:num | Retrieves documents based on the limit specified |
| GET /documents?limit=:num&offset=:num | Retrieves documents based on the limit and offset specified |
| GET /documents/:id | Retrieves a single documents |
| PUT /documents/:id | Update a document |
| DELETE /documents/:id | Delete a single document |


#### Keys to note
Roles Available: 
* roleId 1 is an admin role
* roleId 2 is a regular user

Document Access Types Available:
* public
* private
* role

### Some sample requests and responses from the API.
#### Create User

#### Request

Endpoint: POST: /users
Body (application/json)
```
{
  "username": "Hopeaaz",
  "firstName": "Hopez",
  "lastName": "Ngere",
  "email": "hopeaaz@hopez.com",
  "RoleId": 1,
  "password": "password"
}
```

#### Response

Status: 201: Created
Body (application/json)

```
{
  "user": {
    "id": 21,
    "username": "Hopeaaz",
    "firstName": "Hope",
    "lastName": "Ngere",
    "email": "hopeaaz@hopez.com",
    "roleId": 1,
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE5LCJ1c2VybmFtZSI6IkhvcGVhYXoiLCJyb2xlSWQiOjIsImlhdCI6MTQ5OTY4NzMzMSwiZXhwIjoxNDk5NzczNzMxfQ.y3gXilf0kGxbP9pPV90MWdGQMmHHRKqn5nJd39WQXrk"
}
```
#### Get Users

#### Request

Endpoint: GET: /users
Requires: Authentication, Admin Role
Response

Status: 200: OK
Body (application/json)
```
[{
  "id": 22,
  "username": "blessed",
  "firstName": "blessed",
  "lastName": "ngere",
  "email": "blessed@hopez.com",
  "RoleId": 2,
},
{
  "id": 124,
  "username": "blessed2",
  "firstName": "blessed2",
  "lastName": "blessed2",
  "email": "blessed2@hopez.com",
  "RoleId": 2,
}]
```

#### Documents

Endpoint for document API.

#### Get All Documents except private documents
#### Request

Endpoint: GET: /documents
#### Response

Status: 200: OK
Body (application/json)

```
[{
    "id": 11,
    "documentName": "Testing Postman",
    "description": "Testing Postman description",
    "content": "Blessed are you",
    access: "public"
    "creatorId": 1,
    "createdAt": "2017-02-17T17:40:45.146Z",
  }
  ]
```


## Limitations:
* Users can only create and retrieve textual documents.
* Users cannot share documents with people.

### Please note that once an Admin deletes a user, the user's public documents still remain here for other to view

## Contribute
---------------------------------------------------------------------------------------------------------------------------

If you are interested in contributing to development of Hopeaz DMS, that's really great!

Follow the instructions below to contribute.
please note that: 

* All Javascript MUST be written in >= ES6 and should use Babel to transpile down to ES5

* Classes/modules MUST use the >=ES6 methods of module imports and exports.

* Ensure you have extended airbnb eslint rules 

To proceed: 

* Fork the repository

* Create a branch using the following format
```
feature/branchName 
```
* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description stating the changes made

* Approach to writing a Pull Request
```
- Include the purpose of this Pull Request. For example:
   This is to add roles…
- Provide an overview of why the work is taking place (with any relevant links)
- Provide an overview of what you have done (with screenshots if available)
- If the Pull Request is work in progress, say so. A prefix of “[WIP]” in the title. 
```

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
