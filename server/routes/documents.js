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
     *     description: Creates a new documents
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
     *       200:
     *         description: 'Yay!! you have successfully created a new document'
     *       409:
     *         description: 'So sorry, your document could not be created'
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
     *         description: An array of documents
     *         schema:
     *           $ref: '#/definitions/Documents'
     */
    .get(authMiddleware.authenticate(), documentsController.listDocuments);

  // retrieve, update and delete documents by id endpoints
  router
    .route('/documents/:id')
    /**
     * @swagger
     * /api/documents/{id}:
     *   get:
     *     tags:
     *       - Documents
     *     description: Returns a single Documents
     *     summary: Gets a single documents
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
     *         description: Document successfully retrieved
     *         schema:
     *           $ref: '#/definitions/Documents'
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
     *         description: Successfully updated
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
     *     responses:
     *       200:
     *         description: Successfully deleted
     *       schema:
     *           $ref: '#/definitions/Documents'
     */
    .delete(authMiddleware.authenticate(), documentsController.destroyDocument);
};

export default documentRoute;
