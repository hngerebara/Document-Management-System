import toastr from 'toastr';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as types from './AuthActionTypes';
import axios from '../../utils/api';

/**
 *
 * @desc save user success action creator.
 * @param {object} user
 * @returns {object} actiontype and user Object
 */
const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user,
});

/**
 *
 * @desc calls the login endpoint and saves the token
 * @param {object} userData
 * @returns {object} success or error message, token, and user Object.
 */
const checkinUserAction = ({ email, password }) => dispatch =>
  axios
    .post('/users/login', { email, password })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      const payload = API_URL === '9999'
        ? { email, password }
        : jwtDecode(token);
      dispatch(setCurrentUser(payload));
      toastr.success('Successfully logged in');
    })
    .catch((error) => {
      dispatch({
        type: types.CHECKIN_ERROR,
        error,
      });
      throw error;
    });

/**
 *
 * @desc calls the logout endpoint and removes token from local storage.
 * Redirects user to homepage.
 * @returns {string} returns a success message.
 */
const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  toastr.info('You have successfully logged out');
  browserHistory.push('/');
};

export { setCurrentUser, checkinUserAction, signOutUser };
