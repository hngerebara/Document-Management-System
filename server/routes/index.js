import express from 'express';
import jwt from 'jsonwebtoken';
import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import authenticateController from '../controllers/authenticate';
import auth from '../config/middlewares/authentication';

const authMiddleware = auth();
const router = express.Router();

router.get("/users", authMiddleware.authenticate(), usersController.list);
router.post("/users", usersController.create);

router
  .route("/users/:id")
  .all(authMiddleware.authenticate())
  .get(usersController.retrieve)
  .put(usersController.update)
  .delete(usersController.destroy)

router
.post("/users/:creatorId/documents", authMiddleware.authenticate(), documentsController.create)
.get("/users/:creatorId/documents", authMiddleware.authenticate(), usersController.retrieveAll)

router.get("/documents", authMiddleware.authenticate(), documentsController.list);

router
  .route("/documents/:id")
  .all(authMiddleware.authenticate())
  .get(documentsController.retrieve)
  .put(documentsController.update)
  .delete(documentsController.destroy);

router.post("/token", authenticateController.getToken);

export default router;
