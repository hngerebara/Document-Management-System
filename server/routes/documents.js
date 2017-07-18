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
     *         description: 'Document created'
     *       403:
     *         description: 'No field can be empty'
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
     *         description: Documents retrieved succesfully
     *       409:
     *         description: Documents could not be retrieved
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
     *         description: Document successfully retrieved
     *       409:
     *         description: Document could not be retrieved
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
     *       409:
     *         description: Fields cannot be left empty
     *       400:
     *         description: Document does not exist
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
     *       409:
     *         description: Could not delete document
     *       schema:
     *           $ref: '#/definitions/Documents'
     */
    .delete(authMiddleware.authenticate(), documentsController.destroyDocument);
};

export default documentRoute;
