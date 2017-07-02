import UsersReducer
from '../../../client/src/components/admin/manageUsers/UsersReducer';

const initialState = {
  users: [],
  isSearching: false,
  pagination: {},
  searchPagination: {},
  searchUsers: [],
  currentUser: {},
  searchQuery: ''
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
      isSearching: false,
      pagination: {},
      searchPagination: {},
      searchUsers: [],
      currentUser: {},
      searchQuery: ''
    });
  });

  it('should fetch users and change the initial state', () => {
    expect(UsersReducer(undefined, {
      type: 'FETCH_USERS_SUCCESS',
      users: [users]
    })).toEqual({
      users: [users],
      isSearching: false,
      pagination: {},
      searchPagination: {},
      searchUsers: [],
      currentUser: {},
      searchQuery: ''
    });
  });
});
