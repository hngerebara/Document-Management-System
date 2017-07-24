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
     *         examples:
     *           application/json:
     *              {
     *                user: {
     *                  firstName: "swagger5",
     *                  lastName: "swagger5",
     *                  username: "swagger5",
     *                  email: "swagger5@gmail.com",
     *                  roleId: 2
     *                },
     *                token: "token"
     *              }
     *       409:
     *         description: Return user already exists
     *         examples:
     *           application/json:
     *              {
     *                 message: User email or password already exists
     *              }
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
     *         examples:
     *           application/json: {
     *            pagination: {
     *                pageCount: 1,
     *                page: 1,
     *                rowsPerPage: 6,
     *                totalCount: 2
     *              },
     *              users: [
     *                {
     *                  id: 30,
     *                  username: "hopez",
     *                  firstName: "hopez",
     *                  lastName: "hopez",
     *                   email: "hopez@gmail.com",
     *                   roleId: 2,
     *                   Role: {
     *                       id: 2,
     *                        title: "Staff"
     *                       }
     *                  },
     *                {
     *                  id: 301,
     *                  username: "hopez2",
     *                  firstName: "hopez2",
     *                  lastName: "hopez2",
     *                   email: "hopez2@gmail.com",
     *                   roleId: 2,
     *                   Role: {
     *                       id: 2,
     *                        title: "Staff"
     *                       }
     *                  }]
     *              }
     *       409:
     *         description: Return Unauthorized
     *         examples:
     *           application/json:
     *              {
     *                 message: Only Admin can access this page
     *              }
     *       400:
     *         description: Users could not be retrieved
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
     *       200:
     *         description: Return token
     *         examples:
     *           application/json:
     *              {
     *                 token: "token"
     *              }
     *       401:
     *         description: Return incorrect details
     *         examples:
     *           application/json:
     *              {
     *                 message: Your details are incorrect…Try again
     *              }
     */
  router.route('/users/login').post(usersController.login);

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
     *         description: Return user object
     *         examples:
     *           application/json:
     *              {
     *                 user: {
     *                  id: 1,
     *                  username: "Admin",
     *                  firstName: "admin2",
     *                  lastName: "admin",
     *                  email: "Admin@gmail.com",
     *                  roleId: 1
     *                 }
     *              }
     *       404:
     *         description: Return not found
     *         examples:
     *           application/json:
     *              {
     *                 message: User with id no does not exist
     *              }
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
     *       200:
     *         description: Return user object
     *         examples:
     *           application/json:
     *              {
     *                user: {
     *                  id: 3,
     *                  username: "hopez",
     *                  firstName: "hopez",
     *                  lastName: "hopez",
     *                  email: "hopez@gmail.com",
     *                  updatedAt: "2017-07-23T23:34:16.526Z"
     *                }
     *              }
     *       401:
     *         description: Return unauthorized
     *         examples:
     *           application/json:
     *              {
     *                 message: You have no rights to update this profile
     *              }
     *       409:
     *         description: Return profile update error
     *         examples:
     *           application/json:
     *              {
     *                 message: You had some errors updating your profile. Please check details entered
     *              }
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
     *         examples:
     *           application/json:
     *              {
     *                 message: User deleted successfully
     *              }
     *       400:
     *         description: An error occured while attempting to delete user
     *       409:
     *         description: Return Not found for invalid user
     *         examples:
     *           application/json:
     *              {
     *                 message: The user cannot be found therefore cannot be deleted
     *              }
     */
    .delete(authMiddleware.authenticate(), usersController.destroyUser);

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
     *         description: logout user
     *         examples:
     *           application/json:
     *              {
     *                 message: You have succesfully logged out
     *              }
     *         schema:
     *           $ref: '#/definitions/Users'
     */
  router.route('/users/logout').post(usersController.logout);

  router
    .route('/users/:creatorId/documents')
    .get(authMiddleware.authenticate(), usersController.retrieveAll);

  router.get('/check-username/:username', usersController.checkUsername);
};

export default userRoute;
