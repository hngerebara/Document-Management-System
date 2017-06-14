import axios from 'axios';
import jwtDecode from 'jwt-decode';

const ROOT_URL = 'http://localhost:8000';

export const CHECKIN_ERROR = 'CHECKIN_ERROR';
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

export const checkinUser = ({ email, password }) => (dispatch) => axios.post(`${ROOT_URL}/users/login`, { email, password })
  .then((response) => {
    const token = response.data.token;
    const user = jwtDecode(token).user;
    localStorage.setItem('token', token);
    dispatch({
      type: CHECK_IN_SUCCESS,
      user,
      token
    });
  })
  .catch((error) => {
    dispatch({
      type: CHECKIN_ERROR
    });
    throw error;
  });


export const signupUser = ({ username, firstName, lastName, email, password }) => (dispatch) => 
axios.post(`${ROOT_URL}/users`, { username, firstName, lastName, email, password })
  .then((response) => {
    console.log(response)
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch({
      type: SIGNUP_SUCCESS,
      token,
      message: 'Sign Up successful'
    });
  })
  .catch((error) => {
    console.log(error)
    dispatch({
      type: SIGNUP_ERROR
    });
    throw error;
  });


export const signOutUser = () => {
  dispatch({
    type: SIGN_OUT
  });
  window.localStorage.removeItem('token');
};
