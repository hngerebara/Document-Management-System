import searchController from '../controllers/search';
import auth from '../configs/middlewares/auth';

const authMiddleware = auth();

const searchRoute = (router) => {
  /**
 * @swagger
     * definition:
     *   documents:
     *     properties:
     *       documentName:
     *         type: string
     *       description:
     *         type: string
     *       content:
     *         type: string
     *       access:
     *         type: string
     *       roleId:
     *         type: integer
     *       ownerId:
     *         type: integer
     */
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
    .route('/search/documents')
        /**
         * @swagger
         * /api/search/documents/?search={query}:
         *   get:
         *     tags:
         *       - Search
         *     description: Returns all documents created by a user
         *     parameters:
         *       - name: Authorization
         *         description: JWT Token to authorize users
         *         in: header
         *         required: true
         *       - name: query
         *         description: search qeury
         *         in: path
         *         required: true
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: search succesful
         *       409:
         *         description: Error occurred while searching for documents
         *         schema:
         *           $ref: '#/definitions/Documents'
         *         examples:
         *            application/json: [
         *              { documentName: "hope",
         *                description: "Hope",
         *                access: "private",
         *                content: "blessed document"
         *              }]
         */
    .get(authMiddleware.authenticate(), searchController.searchDocuments);

  router
    .route('/search/users')
    /**
     * @swagger
     * /api/search/users/?search={query}:
     *   get:
     *     tags:
     *       - Search
     *     description: Returns all Users that match the search query
     *     summary: Returns all users that match the search query
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: query
     *         description: search qeury
     *         in: path
     *         required: true
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: users retrieved
     *       409:
     *         description: Error occurred while searching for users
     *         schema:
     *           $ref: '#/definitions/Users'
     *         application/json: [
     *              { username: "hope",
     *                firstName: "Hope",
     *                lastName: "Hope",
     *                email: "hope@gmail.com",
     *                password: 1234556
     *              }]
     */
    .get(authMiddleware.authenticate(), searchController.searchUsers);
};

export default searchRoute;
