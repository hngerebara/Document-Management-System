import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions
from '../../../client/src/components/users/manageUsers/UsersActions';
import * as types from
'../../../client/src/components/users/manageUsers/UsersActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
const userId = 2;


describe('User actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('fetchUsers Action', () => {
    const offset = 0;
    const limit = 4;
    it('Fetches all users', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_USERS_SUCCESS,
          data: {
            users: [],
            pagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            },
          },
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.fetchAllUsers(offset, limit))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            users: [],
            pagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            },
          }
        });
      });
    });
  });

  describe('deleteUser Action', () => {
    it('delete single user', (done) => {
      const expectedActions = [
        {
          type: types.DELETE_USER_SUCCESS,
          userId
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.deleteUser(2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200
        });
      });
    });
  });

  describe('SearchUser Action', () => {
    const offset = 0;
    const limit = 6;
    const searchQuery = 'hope';
    it('searches users', (done) => {
      const expectedActions = [
        {
          type: types.SEARCH_USERS_SUCCESS,
          data: {
            searchUsers: [],
            searchPagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            }
          },
          searchQuery
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.searchAllUsers(searchQuery, offset, limit))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            searchUsers: [],
            searchPagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            }
          }
        });
      });
    });
  });

  describe('getOneUser Action', () => {
    it('retrieves one user', (done) => {
      const expectedActions = [
        {
          type: types.GET_USER_SUCCESS,
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.getOneUser(userId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200
        });
      });
    });
  });
});


describe('Actions', () => {
  it('should have a type of "FETCH_USERS_SUCCESS"', () => {
    expect(actions.fetchUsersSuccess().type).toEqual('FETCH_USERS_SUCCESS');
  });

  it('should have a type of "DISPLAY_FAILURE_MESSAGE"', () => {
    expect(actions.displayFailureMessage().type).toEqual('DISPLAY_FAILURE_MESSAGE');
  });

  it('should have a type of "DELETE_USER_SUCCESS"', () => {
    expect(actions.deleteUserSuccess().type).toEqual('DELETE_USER_SUCCESS');
  });

  it('should have a type of "SEARCH_USERS_SUCCESS"', () => {
    expect(actions.searchUserSuccess().type).toEqual('SEARCH_USERS_SUCCESS');
  });

  it('should have a type of "SEARCH_FAILURE_MESSAGE"', () => {
    expect(actions.searchFailureMessage().type).toEqual('SEARCH_FAILURE_MESSAGE');
  });

  it('should have a type of "CLEAR_SEARCH"', () => {
    expect(actions.clearSearch().type).toEqual('CLEAR_SEARCH');
  });
});

