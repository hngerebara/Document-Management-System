import express from 'express';
import usersController from '../controllers/users';
// import rolesController from '../controllers/roles';
import documentsController from '../controllers/documents';
import auth from '../config/middlewares/auth';

const authMiddleware = auth();
const router = express.Router();

//signup
router.post('/users', usersController.create);

//signin
router.post('/users/login', usersController.login);

//retrieve all users
//only accessible to admin
router.get('/users',authMiddleware.authenticate(), usersController.list);

//retrieve, delete and update user by id enpoints
router
  .route('/users/:id')
  .all(authMiddleware.authenticate())
  .get(usersController.retrieve)
  .put(usersController.update)
  .delete(usersController.destroy)

//create and retrieve documents by creator's id endpoint
router
.route('users/:creatorId/documents')
.all(authMiddleware.authenticate())
.post(documentsController.create)
.get(usersController.retrieveAll)

//retrieve all documents endpoint
router.get('/documents',
authMiddleware.authenticate(),
documentsController.list);

router.post('/documents',
authMiddleware.authenticate(),
documentsController.create);

// retrieve, update and delete documents by id endpoints
router.get('/documents/:id',
authMiddleware.authenticate(),
documentsController.retrieve);

router.put('/documents/:id',
authMiddleware.authenticate(),
documentsController.update);

router.delete('/documents/:id',
authMiddleware.authenticate(),
documentsController.destroy);
// router
//   .route('/documents/:id')
//   .all(authMiddleware.authenticate())
//   .get(documentsController.retrieve)
//   .put(documentsController.update)
//   .delete(documentsController.destroy)


//retrieve and create roles endpoint
//only accesible by admin
// router
// .route('/roles')
// .all(authMiddleware.authenticate())
// // .post('/roles', rolesController.create)
// .get('/roles', rolesController.list)

export default router;
