import axios from '../../../utils/api';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const DISPLAY_FAILURE_MESSAGE = 'DISPLAY_FAILURE_MESSAGE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SEARCH_FAILURE_MESSAGE = 'SEARCH_FAILURE_MESSAGE';


export const fetchUsersSuccess = data => ({
  type: FETCH_USERS_SUCCESS,
  data
});

export const displayFailureMessage = errorMessage => ({
  type: DISPLAY_FAILURE_MESSAGE,
  errorMessage
});

/**
 *
 * @desc calls the users endpoint to retrieve all users
 * @param {object} offset, limit for pagination
 * @returns {array} an array of users.
 */
export const fetchAllUsers = (offset = 0, limit = 4) => (dispatch) => {
  axios
    .get(`/users?limit=${limit}&offset=${offset}`)
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
  userId
});

/**
 *
 * @desc calls the delete user endpoint.
 * @param {integer} userId
 * @returns {null}
 */
export const deleteUser = userId => dispatch =>
  axios.delete(`/users/${userId}/`).then(() => {
    dispatch(deleteUserSuccess(userId));
  });

export const searchUserSuccess = (data, searchQuery) => ({
  type: SEARCH_USERS_SUCCESS,
  data,
  searchQuery
});

export const searchFailureMessage = errorMessage => ({
  type: SEARCH_FAILURE_MESSAGE,
  errorMessage
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});
/**
 *
 * @desc calls the search users endpoint.
 * @param {object} search query, limit and offset for pagination
 * @returns {object} user object
 */
export const searchAllUsers = (search, offset = 0, limit = 6) => dispatch =>
  axios.get(`/search/users?search=${search}&limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(searchUserSuccess(response.data, search));
    }).catch((error) => {
      dispatch(searchFailureMessage(error.response));
      throw error;
    });
