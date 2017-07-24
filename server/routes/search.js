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
     *         description: Return an array of search retults
     *         schema:
     *           $ref: '#/definitions/Documents'
     *         examples:
     *           application/json: {
     *              searchPagination: {
     *                pageCount: 1,
     *                page: 1,
     *                rowsPerPage: 6,
     *                totalCount: 1
     *              },
     *              documents: [
     *              {
     *                id: 33,
     *                documentName: "hope",
     *                description: "Hope",
     *                access: "private",
     *                content: "blessed document",
     *                creatorId: 38,
     *                createdAt: "2017-07-23T19:03:14.904Z"
     *              }]
     *            }
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
   *         description: Return array of users retrieved
   *         schema:
   *           $ref: '#/definitions/Users'
   *         examples:
   *           application/json: {
   *            searchPagination: {
   *                pageCount: 1,
   *                page: 1,
   *                rowsPerPage: 6,
   *                totalCount: 1
   *              },
   *              searchUsers: [
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
   *                ]
   *              }
   */
    .get(authMiddleware.authenticate(), searchController.searchUsers);
};

export default searchRoute;
