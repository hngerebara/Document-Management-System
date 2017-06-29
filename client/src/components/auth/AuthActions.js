import setAuthToken from '../../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import axios from '../../utils/api';

export const CHECKIN_ERROR = 'CHECKIN_ERROR';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

const checkinUserAction = ({ email, password }) =>
dispatch => axios.post('/users/login', { email, password })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((error) => {
    dispatch({
      type: CHECKIN_ERROR,
      error
    });
  });


const signOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  browserHistory.push('/');
};

export {
  setCurrentUser,
  checkinUserAction,
  signOutUser
};

