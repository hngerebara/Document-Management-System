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
  axios.get(`${ROOT_URL}/users/?limit=10?offset=0`)
  .then((response) => {
    dispatch(fetchUsersSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  user,
});

export const deleteUser = userId => (dispatch) => {
  console.log("getting to the functionn")
  axios.delete(`${ROOT_URL}/user/${userId}/`)
    .then((response) => {
      dispatch(deleteUserSuccess(response.data.message));
      dispatch(fetchAllUsers());
    })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};
