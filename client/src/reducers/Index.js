import { combineReducers } from 'redux';  
import Users from '../user/UsersReducer';
import Auth from '../auth/AuthReducer';

const RootReducer = combineReducers({  
  Users,
  Auth
});

export default RootReducer;
