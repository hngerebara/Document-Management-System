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
     * /api/users:
     *   post:
     *     tags:
     *       - Users
     *     description: Creates a new User
     *     summary: create new user
     *     consumes:
     *       - application/x-www-form-urlencoded
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: username
     *         in: formData
     *         required: true
     *       - name: firstName
     *         description: first name
     *         in: formData
     *       - name: lastName
     *         description: last name
     *         in: formData
     *       - name: email
     *         description: email
     *         in: formData
     *         required: true
     *       - name: password
     *         description: password
     *         in: formData
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Users'
     *     responses:
     *       201:
     *         description: Successfully created
     *       409:
     *         description: User email or password already exists
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
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Users'
     *     responses:
     *       200:
     *         description: users retrieved
     *       400:
     *         description: Users could not be retrieved
     *         schema:
     *           $ref: '#/definitions/Users'
     *         examples:
     *           application/json: [
     *              { username: "hope",
     *                firstName: "Hope",
     *                lastName: "Hope",
     *                email: "hope@gmail.com",
     *                password: 1234556
     *              }]
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
     *     consumes:
     *       - application/x-www-form-urlencoded
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: user email
     *         in: formData
     *         required: true
     *       - name: password
     *         description: user password
     *         in: formData
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Users'
     *     responses:
     *       202:
     *         description: login Successful
     *       401:
     *         description: Your details are incorrect..Try again
     */
  router.route('/users/login').post(usersController.login);

  /**
     * @swagger
     * /api/users/logout:
     *   post:
     *     tags:
     *       - Users
     *     description: Logs a user out
     *     summary: Logs out a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: email
     *         description: user email
     *         in: formData
     *         required: true
     *       - name: password
     *         description: user password
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: logout Successful
     *         schema:
     *           $ref: '#/definitions/Users'
     */
  router.route('/users/logout').post(usersController.logout);

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
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: user's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: user retrieved
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
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: user's id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: username
     *         description: username
     *         in: formData
     *         required: true
     *       - name: firstName
     *         description: first name
     *         in: formData
     *         required: true
     *       - name: lastName
     *         description: lastname
     *         in: formData
     *         required: true
     *       - name: email
     *         description: email
     *         in: formData
     *         required: true
     *       - name: password
     *         description: password
     *         in: formData
     *         required: true
     *         schema:
     *           type: array
     *           $ref: '#/definitions/Users'
     *     responses:
     *       202:
     *         description: Successfully updated
     *       400:
     *         description: You had some errors updating your profile
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
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: user's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       400:
     *         description: An error occured while attempting to delete user
     */
    .delete(authMiddleware.authenticate(), usersController.destroyUser);

  router
    .route('/users/:creatorId/documents')
    .get(authMiddleware.authenticate(), usersController.retrieveAll);

  router.get('/check-username/:username', usersController.checkUsername);
};

export default userRoute;
