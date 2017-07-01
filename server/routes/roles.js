import rolesController from '../controllers/roles';
import auth from '../configs/middlewares/auth';
import adminVerify from '../configs/middlewares/adminVerification';

const authMiddleware = auth();

const roleRoute = (router) => {
  /**
   * @swagger
   * definition:
   *   Roles:
   *    properties:
   *      title:
   *        type: string
   */
  router
    .route('/roles')
    /**
     * @swagger
     * /api/roles:
     *   post:
     *     tags:
     *       - Roles
     *     description: Create a New Role
     *     summary: Create a New Role
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: role
     *         description: Role object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Roles'
     *     responses:
     *       201:
     *         description: New role created
     *       400:
     *         description: New role couldnot be created
     */
    .post(authMiddleware.authenticate(), adminVerify, rolesController.create)
    /**
     * @swagger
     * /api/roles:
     *   get:
     *     tags:
     *       - Roles
     *     description: Returns all roles
     *     summary: Returns all roles
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: All roles succesfully retrieved
     *       400:
     *         description: Could not retrieve roles
     *         schema:
     *           $ref: '#/definitions/Roles'
     */
    .get(authMiddleware.authenticate(), adminVerify, rolesController.list)
    

  router
    .route('/roles/:id')
    /**
     * @swagger
     * /api/roles/{id}:
     *   get:
     *     tags:
     *       - Roles
     *     description: Returns a single role
     *     summary: Returns a single role
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: role id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Role successfully retrieved
     *         schema:
     *           $ref: '#/definitions/Roles'
     */
    .get(authMiddleware.authenticate(), adminVerify, rolesController.retrieve)
    /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     tags:
     *       - Roles
     *     description: updates a single role
     *     summary: Updates a single role
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: role
     *         description: new role title
     *         in: body
     *         required: true
     *         type: object
     *     responses:
     *       200:
     *         description: You have succesfully updated this role
     */

    .put(authMiddleware.authenticate(), adminVerify, rolesController.update)
    /**
     * @swagger
     * /api/roles/{id}:
     *   delete:
     *     tags:
     *       - Roles
     *     description: deletes a single role
     *     summary: Delete a single role
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: role id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Role deleted successfully.
     */
    .delete(
      authMiddleware.authenticate(),
      adminVerify,
      rolesController.destroy
    );
};

export default roleRoute;
