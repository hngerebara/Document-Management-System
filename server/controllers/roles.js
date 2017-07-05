import { Roles } from '../models';

const rolesController = {
  create(req, res) {
    return Roles.create({
      title: req.body.roleTitle
    })
      .then((role) => {
        res.status(201).send({
          message: 'New role created',
          role
        });
      })
      .catch(error => res.status(409)
      .send({
        message: 'New role could not be created',
        error
      }));
  },

  list(req, res) {
    return Roles.findAll({})
      .then((roles) => {
        res.status(200).send({
          message: 'All roles succesfully retrieved',
          roles
        });
      })
      .catch(error => res.status(400)
      .send({
        message: 'Could not retrieve roles',
        error
      }));
  },

  retrieve(req, res) {
    return Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
          .send({
            message: 'Role Not Found'
          });
        }
        return res.status(200)
        .send({
          message: 'Role successfully retrieved',
          role
        });
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Roles.findById(req.params.id)
    .then((role) => {
      role
        .update({
          title: req.body.roleTitle
        })
        .then(() => res.status(200)
        .send({
          message: 'You have succesfully updated this role',
          role
        })
        )
        .catch(error => res.status(400).send(error));
    });
  },

  destroy(req, res) {
    return Roles.findById(req.params.id)
      .then(role => role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully.'
          }))
          .catch(error => res.status(400).send(error)))
      .catch(error => res.status(500).send(error));
  }
};

export default rolesController;
