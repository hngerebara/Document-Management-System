import { Levels, Users } from '../models';

const levelsController = {
  createLevel(req, res) {
    return Levels
    .create({
      levelName: req.body.levelName,
    })
      .then(level => res.status(201).send(level))
      .catch(error => res.status(400).send(error));
  },
  allLevels(req, res) {
    return Levels.findAll({
      include: [
        {
          model: Users,
          as: 'levels'
        }
      ]
    })
      .then((level) => {
        res.status(200).send(level);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  retrieveLevelId(req, res) {
    return Levels.findById(req.params.id)
      .then((level) => {
        if (!level) {
          return res.status(404).send({
            message: 'User Level not found'
          });
        }
        return res.status(200).send(level);
      })
      .catch(error => res.status(400).send(error));
  },

  updateLevel(req, res) {
    return Levels.findById(req.params.id)
    .then((level) => {
      if (!level) {
        return res.status(404).send({
          message: 'User Level not found'
        });
      }
      return level
        .update({
          levelName: req.body.levelName
        })
        .then(() => res.status(200).send(level))
        .catch(error => res.status(400).send(error));
    });
  },

  destroyLevel(req, res) {
    return Levels.findById(req.params.id)
      .then((level) => {
        if (!level) {
          return res.status(404).send({
            message: 'The user level cannot be found therfore cannot be deleted'
          });
        }
        return level
          .destroy()
          .then(() => res.status(200).send({
            message: 'Level deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

export default levelsController;
