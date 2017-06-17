import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

const ROOT_URL = 'http://localhost:8090';

export const CHECKIN_ERROR = 'CHECKIN_ERROR';
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export function checkinUser(user) {
  return {
    type: CHECK_IN_SUCCESS,
    user
  };
}

export const checkinUserAction = ({ email, password }) =>
dispatch => axios.post(`${ROOT_URL}/users/login`, { email, password })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    dispatch(checkinUser(jwtDecode(token)));
  })
  .catch((error) => {
    dispatch({
      type: CHECKIN_ERROR,
      error
    });
  });


export const signupUser = ({ username, firstName, lastName, email, password }) => dispatch =>
axios.post(`${ROOT_URL}/users`, { username, firstName, lastName, email, password })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
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


export const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(checkinUser({}));
};
