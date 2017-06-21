import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

const ROOT_URL = 'http://localhost:8090';

export const CHECKIN_ERROR = 'CHECKIN_ERROR';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export const checkinUserAction = ({ email, password }) =>
dispatch => axios.post(`${ROOT_URL}/users/login`, { email, password })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((error) => {
    dispatch({
      type: CHECKIN_ERROR,
      error
    });
  });


export const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
