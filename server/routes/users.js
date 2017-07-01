import usersController from '../controllers/users';
import auth from '../configs/middlewares/auth';
import adminVerify from '../configs/middlewares/adminVerification';

const authMiddleware = auth();

const userRoute = (router) => {
    /**
     * @swagger
     * definition:
     *   Users:
     *     properties:
     *       username:
     *         type: string
     *       firstName:
     *         type: string
     *       lastName:
     *         type: string
     *       email:
     *         type: string
     *       password:
     *         type: string
     */
  router
    .route('/users')
    /**
     * @swagger
     * /api/Users:
     *   post:
     *     tags:
     *       - Users
     *     description: Creates a new User
     *     summary: create new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: user object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Users'
     *     responses:
     *       200:
     *         description: Successfully created
     *       400:
     *         description: cannot create user
     */
    .post(usersController.createUser)

    /**
     * @swagger
     * /api/users:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns all Users
     *     summary: Returns all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of Users
     *         schema:
     *           $ref: '#/definitions/Users'
     */
    .get(
      authMiddleware.authenticate(),
      adminVerify,
      usersController.listAllUsers
    );

  /**
     * @swagger
     * /api/users/login:
     *   post:
     *     tags:
     *       - Users
     *     description: logs a user in and Returns a token;
     *     summary: logs a user in
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: user email
     *         in: body
     *         required: true
     *       - name: password
     *         description: user password
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Users'
     *     responses:
     *       200:
     *         description: login Successful
     */
  router.route('/users/login').post(usersController.login);

  /**
     * @swagger
     * /api/users/logout:
     *   get:
     *     tags:
     *       - Users
     *     description: Logs a user out
     *     summary: Logs out a user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: logout Successful
     *         schema:
     *           $ref: '#/definitions/Users'
     */
  router.route('/users/logout').post(usersController.logout);

  // retrieve, delete and  update user by id enpoints
  router
    .route('/users/:id')
    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns a single User
     *     summary: Returns a single User
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single User
     *         schema:
     *           $ref: '#/definitions/Users'
     */
    .get(authMiddleware.authenticate(), usersController.retrieveUser)
    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     tags:
     *       - Users
     *     description: Updates a single User
     *     summary: updates a single User
     *     produces: application/json
     *     parameters:
     *       - name: user
     *         description: user object
     *         in: path
     *         required: true
     *         schema:
     *           type: array
     *           $ref: '#/definitions/Users'
     *     responses:
     *       200:
     *         description: Successfully updated
     */
    .put(authMiddleware.authenticate(), usersController.updateUser)
    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     description: Deletes a single User
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     */
    .delete(authMiddleware.authenticate(), usersController.destroyUser);

  // create and retrieve documents by creator's id endpoint
  router
    .route('/users/:creatorId/documents')
    .get(authMiddleware.authenticate(), usersController.retrieveAll);

  // router.get('/users-docs', adminVerify, usersController.listAllUsersAndDocs);
};

export default userRoute;
