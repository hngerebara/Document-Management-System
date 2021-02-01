import documentRoute from './documents';
import userRoute from './users';
import searchRoute from './search';

const allRoutes = (router) => {
  userRoute(router);
  documentRoute(router);
  searchRoute(router);
};

export default allRoutes;
