import jwtDecode from 'jwt-decode';

import axios from '../../utils/api';
import { setCurrentUser } from './AuthActions';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

/**
 *
 *
 * @export
 * @param {any} id
 * @returns
 */
export const isUserExists = (id) => {
  return dispatch => axios.get(`/users/${id}`);
}

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
        type: SIGNUP_SUCCESS,
        token,
        message: 'Sign Up successful'
      });
    })
    .catch((error) => {
      dispatch({
        type: SIGNUP_ERROR
      });
      throw error;
    });
