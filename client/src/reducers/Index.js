import { combineReducers } from 'redux';  
import Users from '../components/user/UsersReducer';
import CheckinReducer from '../components/auth/CheckinReducer';
import SignupReducer from '../components/auth/SignupReducer';
import DocumentReducer from '../components/document/DocumentReducer';
import Auth from '../components/auth/AuthReducer';

const RootReducer = combineReducers({  
  Users,
  SignupReducer,
  CheckinReducer,
  DocumentReducer,
  Auth
});

export default RootReducer;
