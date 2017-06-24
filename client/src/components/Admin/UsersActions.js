import axios from 'axios';

const ROOT_URL = 'http://localhost:8090';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const DISPLAY_FAILURE_MESSAGE = 'DISPLAY_FAILURE_MESSAGE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
});

export const displayFailureMessage = errorMessage => ({
  type: DISPLAY_FAILURE_MESSAGE,
  errorMessage
});

export const fetchAllUsers = () => (dispatch) => {
  axios.get(`${ROOT_URL}/users/`)

  .then((response) => {
    dispatch(fetchUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

export const deleteUserSuccess = userId => ({
  type: DELETE_USER_SUCCESS,
  userId,
});

export const deleteUser = userId => (dispatch) =>
  axios.delete(`${ROOT_URL}/users/${userId}/`)
    .then(() => {
      dispatch(deleteUserSuccess(userId));
    });
