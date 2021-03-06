import toastr from 'toastr';
import axios from '../../../utils/api';
import * as types from './UsersActionTypes';


export const fetchUsersSuccess = data => ({
  type: types.FETCH_USERS_SUCCESS,
  data,
});

export const displayFailureMessage = errorMessage => ({
  type: types.DISPLAY_FAILURE_MESSAGE,
  errorMessage,
});

/**
 *
 * @desc calls the users endpoint to retrieve all users
 * @param {number}  offset
 * @param {number} limit
 * @returns {array} an array of users.
 */
export const fetchAllUsers = (offset = 0, limit = 6) => dispatch => axios
    .get(`/users?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(displayFailureMessage(error.response));
      throw error;
    });

export const deleteUserSuccess = userId => ({
  type: types.DELETE_USER_SUCCESS,
  userId,
});

/**
 *
 * @desc calls the delete user endpoint.
 * @param {integer} userId
 * @returns {null} void
 */
export const deleteUser = userId => dispatch =>
  axios.delete(`/users/${userId}/`).then(() => {
    dispatch(deleteUserSuccess(userId));
    toastr.success('User deleted succesfully');
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });

export const searchUserSuccess = (data, searchQuery) => ({
  type: types.SEARCH_USERS_SUCCESS,
  data,
  searchQuery,
});

export const searchFailureMessage = errorMessage => ({
  type: types.SEARCH_FAILURE_MESSAGE,
  errorMessage,
});

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH,
});
/**
 *
 * @desc calls the search users endpoint.
 * @param {string}  search
 * @param {number}  offset
 * @param {number} limit
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

export const updateUserSuccess = data => ({
  type: types.UPDATE_USER_SUCCESS,
  data,
});

export const getUserSuccess = data => ({
  type: types.GET_USER_SUCCESS,
  data,
});

export const updateFailureMessage = errorMessage => ({
  type: types.UPDATE_FAILURE_MESSAGE,
  errorMessage,
});

export const updateUserProfile = updatedUser => dispatch =>
axios.put(`/users/${updatedUser.id}`, updatedUser)
    .then(() => {
      dispatch(updateUserSuccess(updatedUser));
      toastr.success('Profile updated successfully');
    }).catch((error) => {
      dispatch(updateFailureMessage(error.response));
      toastr.error('So sorry, Could not update your details');
      throw error;
    });

export const getOneUser = userId => dispatch =>
   axios.get(`/users/${userId}`)
    .then((response) => {
      dispatch(getUserSuccess(response.data));
    }).catch((error) => {
      dispatch(displayFailureMessage(error.response));
      throw error;
    });
