import UsersReducer
from '../../../client/src/components/users/manageUsers/UsersReducer';
import * as types from '../../../client/src/components/users/manageUsers/UsersActionTypes';

const initialState = {
  users: [],
  user: null,
  isSearching: false,
  pagination: {},
  searchPagination: {},
  searchUsers: [],
  currentUser: {},
  searchQuery: ''
};
const pagination = {
  pageCount: 0,
  page: 1,
  rowsPerPage: 6,
  totalCount: 2
};

const users = [
  {
    username: 'Blessing',
    firstName: 'Blessing',
    lastName: 'Blessing',
    email: 'h.Blessing@gmail.com',
    password: '1234567'
  },

  {
    username: 'Hope',
    firstName: 'Hope',
    lastName: 'Ngere',
    email: 'h.ngere@gmail.com',
    password: '1234567'
  }
];

describe('Manage Users reducer', () => {
  it('should return the initial state', () => {
    expect(UsersReducer(undefined, {})).toEqual({
      users: [],
      user: null,
      isSearching: false,
      pagination: {},
      searchPagination: {},
      searchUsers: [],
      currentUser: {},
      searchQuery: ''
    });
  });

  it('should fetch users and change the initial state', () => {
    const action = {
      type: types.FETCH_USERS_SUCCESS,
      data: {
        users,
        pagination
      }
    };

    const expected = {
      user: null,
      isSearching: false,
      searchPagination: {},
      searchUsers: [],
      currentUser: {},
      searchQuery: '',
      users,
      pagination
    };

    expect(UsersReducer(initialState, action)).toEqual(expected);
  });
});
