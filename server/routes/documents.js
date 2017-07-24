import documentsController from '../controllers/documents';
import auth from '../configs/middlewares/auth';

const authMiddleware = auth();

const documentRoute = (router) => {
  /**
     * @swagger
     * definition:
     *   Documents:
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
     *       creatorId:
     *         type: integer
     */
  router
    .route('/documents')
    /**
     * @swagger
     * /api/documents:
     *   post:
     *     tags:
     *       - Documents
     *     description: Creates a new document
     *     summary: Creates a new document
     *     consumes:
     *       - application/x-www-form-urlencoded
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: documentName
     *         description: document name
     *         in: formData
     *         required: true
     *       - name: description
     *         description: description
     *         in: formData
     *         required: true
     *       - name: access
     *         description: access
     *         in: formData
     *         required: true
     *       - name: content
     *         description: content
     *         in: formData
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Documents'
     *     responses:
     *       201:
     *         description: 'Returns created document object'
     *         examples:
     *           application/json:
     *              {
     *                id: 34,
     *                documentName: "hope",
     *                description: "Hope",
     *                content: "blessed document",
     *                access: "private",
     *                creatorId: 38,
     *                updatedAt: "2017-07-23T19:03:14.904Z",
     *                createdAt: "2017-07-23T19:03:14.904Z"
     *              }
     */
    .post(authMiddleware.authenticate(), documentsController.createDocument)
    /**
     * @swagger
     * /api/documents:
     *   get:
     *     tags:
     *       - Documents
     *     description: Returns all documents
     *     summary: Gets all documents
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *     responses:
     *       200:
     *         description: Returns an array of documents
     *         examples:
     *           application/json: {
     *              pagination: {
     *                pageCount: 1,
     *                page: 1,
     *                rowsPerPage: 6,
     *                totalCount: 2
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
     *              },
     *              {
     *                id: 34,
     *                documentName: "hope2",
     *                description: "Hope2",
     *                access: "PUBLIC",
     *                content: "blessed document2",
     *                creatorId: 38,
     *                createdAt: "2017-07-23T19:03:14.904Z"
     *              },
     *              ]
     *            }
     *       409:
     *         description: Documents could not be retrieved
     *         examples:
     *           application/json:
     *              {
     *                message: Documents could not be retrieved
     *              }
     *         schema:
     *           $ref: '#/definitions/Documents'
     */
    .get(authMiddleware.authenticate(), documentsController.listDocuments);

  router
    .route('/documents/:id')
    /**
     * @swagger
     * /api/documents/{id}:
     *   get:
     *     tags:
     *       - Documents
     *     description: Returns a single Document
     *     summary: Gets a single document
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: Documents's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Retrieved document
     *         schema:
     *           $ref: '#/definitions/Documents'
     *         examples:
     *           application/json:
     *              {
     *                id: 33,
     *                documentName: "hope",
     *                description: "Hope",
     *                content: "blessed document",
     *                access: "private",
     *                updatedAt: "2017-07-23T19:03:14.904Z",
     *                createdAt: "2017-07-23T19:03:14.904Z",
     *                creatorId: 38,
     *              }
     */
    .get(authMiddleware.authenticate(), documentsController.retrieveDocument)
    /**
     * @swagger
     * /api/documents/{id}:
     *   put:
     *     tags:
     *       - Documents
     *     description: Updates a single Document
     *     summary: Updates a single document
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: Documents's id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: documentName
     *         description: document name
     *         in: formData
     *         required: true
     *       - name: description
     *         description: description
     *         in: formData
     *         required: true
     *       - name: access
     *         description: access
     *         in: formData
     *         required: true
     *       - name: content
     *         description: content
     *         in: formData
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Documents'
     *     responses:
     *       200:
     *         description: Return created document object
     *         examples:
     *           application/json:
     *              {
     *                id: 33,
     *                documentName: "hope",
     *                description: "Hope",
     *                access: "private",
     *                content: "blessed document",
     *                creatorId: 38,
     *                updatedAt: "2017-07-23T19:03:14.904Z",
     *                createdAt: "2017-07-23T19:03:14.904Z"
     *              }
     *       409:
     *         description: Return empty fields error
     *         examples:
     *           application/json:
     *              {
     *                message: Fields cannot be left empty
     *              }
     *       401:
     *         description: Return no acces to document
     *         examples:
     *           application/json:
     *              {
     *                message: You don't have access to this document
     *              }
     *       400:
     *         description: Return document does not exist
     *         examples:
     *           application/json:
     *              {
     *                message: Document does not exist
     *              }
     */
    .put(authMiddleware.authenticate(), documentsController.updateDocument)
    /**
     * @swagger
     * /api/documents/{id}:
     *   delete:
     *     tags:
     *       - Documents
     *     description: Deletes a single Documents
     *     summary: Deletes a single documents
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: JWT Token to authorize users
     *         in: header
     *         required: true
     *       - name: id
     *         description: Documents's id
     *         in: path
     *         required: true
     *         type: integer
     *     schema:
     *         $ref: '#/definitions/Documents'
     *     responses:
     *       200:
     *         description: Return message document deleted successfully
     *         examples:
     *           application/json: {
     *             message: Document deleted successfully.
     *            }
     *       401:
     *         description: Return no access to document
     *         examples:
     *           application/json: {
     *             message: You don't have access to this document
     *            }
     *       404:
     *         description: Return document not found
     *         examples:
     *           application/json: {
     *             message: The document cannot be found therefore cannot be deleted
     *            }
     *
     */
    .delete(authMiddleware.authenticate(), documentsController.destroyDocument);
};

export default documentRoute;
