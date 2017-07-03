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
         *         description: An array of documents
         *         schema:
         *           $ref: '#/definitions/Documents'
         */
    .get(authMiddleware.authenticate(), searchController.searchDocuments);

  // search users
  router
    .route('/search/users')
    /**
     * @swagger
     * /api/search/users:
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
     *         description: An array of Users
     *         schema:
     *           $ref: '#/definitions/Users'
     */
    .get(authMiddleware.authenticate(), searchController.searchUsers);
};

export default searchRoute;
