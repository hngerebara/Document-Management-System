import axios from 'axios';


const ROOT_URL = 'http://localhost:8090';


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

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

export function isUserExists(id) {
  return dispatch => {
    return axios.get(`${ROOT_URL}/users/${id}`);
  }
}