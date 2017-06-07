import express from 'express';
import usersController from '../controllers/users';
import rolesController from '../controllers/roles';
import documentsController from '../controllers/documents';
import levelsController from '../controllers/levels';
import authenticateController from '../controllers/authenticate';
import auth from '../config/middlewares/authentication';

const authMiddleware = auth();
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to hopeaz dms'
  });
});

router.get('/roles', authMiddleware.authenticate(), rolesController.list);
router.post('/roles', rolesController.create);

router.get('/users',authMiddleware.authenticate(), usersController.list);
router.post('/users', usersController.create);

router
  .route('/users/:id')
  // .all(authMiddleware.authenticate())
  .get(usersController.retrieve)
  .put(usersController.update)
  .delete(usersController.destroy);

router
.post('/users/:creatorId/documents',
authMiddleware.authenticate(),
documentsController.create)

.get('/users/:creatorId/documents',
authMiddleware.authenticate(),
usersController.retrieveAll);

router.get('/documents',
documentsController.list);

router
  .route('/documents/:id')
  .all(authMiddleware.authenticate())
  .get(documentsController.retrieve)
  .put(documentsController.update)
  .delete(documentsController.destroy);

router.get('/levels', levelsController.allLevels);
router.get('/levels/:id', levelsController.retrieveLevelId);

router
  .route('/levels')
  .all(authMiddleware.authenticate())
  .post(levelsController.createLevel)
  .put(levelsController.updateLevel)
  .delete(levelsController.destroyLevel);


router.post('/login', authenticateController.getToken);

export default router;
