import axios from 'axios';
import AuthApi from './AuthApi';

const ROOT_URL = 'http://localhost:8000';

export const AUTH_ERROR = 'AUTH_ERROR';
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';

export const checkinUser = ({ username, password }) => dispatch =>
  axios.post(`${ROOT_URL}/users/login`, { email: username, password })
  .then(response => {
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: CHECK_IN_SUCCESS
    });
  })
  .catch(error => {
    dispatch({
      type: AUTH_ERROR
    });
    throw error;
  });

export function signOutUser() {
  dispatch({ type: SIGN_OUT });
  sessionStorage.removeItem('token');
  window.location.href = `${ROOT_URL}`;
}

