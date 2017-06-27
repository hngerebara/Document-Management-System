import axios from '../../../utils/api';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const DISPLAY_FAILURE_MESSAGE = 'DISPLAY_FAILURE_MESSAGE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const displayFailureMessage = errorMessage => ({
  type: DISPLAY_FAILURE_MESSAGE,
  errorMessage
});

export const deleteUserSuccess = userId => ({
  type: DELETE_USER_SUCCESS,
  userId,
});

export const searchUserSuccess = usersSearch => ({
  type: SEARCH_USERS_SUCCESS,
  usersSearch,
});

export const fetchAllUsers = (offset = 0) => (dispatch) => {
  axios.get(`/users/?offset=${offset}`)
  .then((response) => {
    dispatch(fetchUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

export const deleteUser = userId => (dispatch) =>
  axios.delete(`/users/${userId}/`)
    .then(() => {
      dispatch(deleteUserSuccess(userId));
    });

export const searchUsers = (query, offset = 0) =>
  (dispatch) => {
    return axios.get(`/search/users/?q=${query}&offset=${offset}`)
      .then((success) => {
        dispatch(searchUserSuccess(success.data));
      })
      .catch((error) => {
        throw error;
      });
};