export default (req, res, next) => {
  if (req.user.roleId !== 1) {
    res.status(401).send({ message: 'Only Admin can access this page' });
  }
  next();
};
