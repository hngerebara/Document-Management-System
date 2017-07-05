import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import * as types from './AuthActionTypes';
import axios from '../../utils/api';

const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user,
});

const checkinUserAction = ({ email, password }) =>
dispatch => axios.post('/users/login', { email, password })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((error) => {
    dispatch({
      type: types.CHECKIN_ERROR,
      error
    });
  });


const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  browserHistory.push('/');
};

export {
  setCurrentUser,
  checkinUserAction,
  signOutUser
};

