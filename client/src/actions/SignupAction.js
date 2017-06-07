import axios from 'axios';

export function userSignupRequest(userData) {
  return (dispatch) => axios.post('/users', userData);
}
