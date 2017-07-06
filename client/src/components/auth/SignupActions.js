import axios from '../../utils/api';
import jwtDecode from 'jwt-decode';
import * as types from './AuthActionTypes';
import { setCurrentUser } from './AuthActions';


/**
 *
 * @desc handles signup request and Stores token to local Storage.
 * @param {object} input from form fields.
 * @returns {object} returns success message, user, and token.
 */
export const signupUser = ({
  username,
  firstName,
  lastName,
  email,
  password
}) => dispatch =>
  axios
    .post('/users', { username, firstName, lastName, email, password })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch(setCurrentUser(jwtDecode(token)));
      dispatch({
        type: types.SIGNUP_SUCCESS,
        token,
        message: 'Sign Up successful'
      });
    })
    .catch((error) => {
      dispatch({
        type: types.SIGNUP_ERROR
      });
      throw error;
    });

