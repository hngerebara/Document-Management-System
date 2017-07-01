import documentRoute from './documents';
import userRoute from './users';
import searchRoute from './search';
import roleRoute from './roles';

const allRoutes = (router) => {
  userRoute(router);
  documentRoute(router);
  searchRoute(router);
  roleRoute(router);
};

export default allRoutes;
