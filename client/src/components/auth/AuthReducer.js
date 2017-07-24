import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, CHECKIN_ERROR } from './AuthActionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
    };
  case CHECKIN_ERROR:
    return {
      isAuthenticated: false,
      user: {},
    };
  default:
    return state;
  }
};
