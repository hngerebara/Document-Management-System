export default (req, res, next) => {
  if (req.user.roleTitle !== 'Admin') {
    res.status(401).send({ message: 'Only Admin can access this page' });
  }
  next();
};
