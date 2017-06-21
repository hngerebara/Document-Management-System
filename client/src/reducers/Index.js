import { combineReducers } from 'redux';  
import UsersReducer from '../components/Admin/UsersReducer';
import DocumentReducer from '../components/document/DocumentReducer';
import Auth from '../components/auth/AuthReducer';

const RootReducer = combineReducers({  
  UsersReducer,
  DocumentReducer,
  Auth
});

export default RootReducer;
