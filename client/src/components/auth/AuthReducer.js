import isEmpty from 'lodash/isEmpty';

import { CHECK_IN_SUCCESS,  } from './AuthActions';


const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHECK_IN_SUCCESS:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
}