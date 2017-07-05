import axios from '../../utils/api';
import jwtDecode from 'jwt-decode';
import * as types from './AuthActionTypes';
import { setCurrentUser } from './AuthActions';

/**
 *
 *
 * @export
 * @param {any} id
 * @returns
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
