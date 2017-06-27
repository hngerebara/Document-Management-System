import express from 'express';
import usersController from '../controllers/users';
import rolesController from '../controllers/roles';
import documentsController from '../controllers/documents';
import searchController from '../controllers/search';
import auth from '../config/middlewares/auth';

const authMiddleware = auth();
const router = express.Router();

// signup and list users routes

router.post('api/users', usersController.create);

router
  .route('api/users')
  .all(authMiddleware.authenticate())
  .get(usersController.listUsers)
  .get(usersController.listUsersAndDocs);

// signin
router.post('api/users/login', usersController.login);

// retrieve, delete and  update user by id enpoints
router
  .route('api/users/:id')
  .all(authMiddleware.authenticate())
  .get(usersController.retrieve)
  .put(usersController.update)
  .delete(usersController.destroy);

// create and retrieve documents by creator's id endpoint
router
.route('api/users/:creatorId/documents')
.all(authMiddleware.authenticate())
.post(documentsController.create)
.get(usersController.retrieveAll);

// Get all documents and create documents route
router
  .route('api/documents')
  .all(authMiddleware.authenticate())
  .get(documentsController.list)
  .post(documentsController.create);

// retrieve, update and delete documents by id endpoints
router
  .route('api/documents/:id')
  .all(authMiddleware.authenticate())
  .get(documentsController.retrieve)
  .put(documentsController.update)
  .delete(documentsController.destroy);


// search documents
router.get('api/search/documents',
authMiddleware.authenticate(),
searchController.searchDocuments);

// search users
router.get('api/search/users',
authMiddleware.authenticate(),
searchController.searchUsers);


// retrieve and create roles endpoint
// only accessible by admin
// router
// .route('/roles')
// .all(authMiddleware.authenticate())
// .post('/roles', rolesController.create)
// .get('/roles', rolesController.list)
// .get('/roles', rolesController.retrieve)
// .put('/roles', rolesController.update)
// .delete('/roles', rolesController.destroy);

export default router;
