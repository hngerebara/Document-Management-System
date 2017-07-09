import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import axios from '../../../client/src/utils/api';
import * as actions from '../../../client/src/components/users/manageUsers/UsersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const users = [
  {
    username: 'hopez',
    firstName: 'Hope',
    lastName: 'Ngerebara',
    email: 'hopez@gmail.com',
    password: '12345',
    roleId: 1
  }
];

describe('Admin Manange User actions - async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch create an action to fetch users', () => {
    nock(API_URL)
      .get('/users')
      .reply(200, {
        body: {
          users: [],
        }
      });

    const expectedActions = [
      {
        type: FETCH_USERS_SUCCESS,
        users
      },
      {
        type: FETCH_USERS_FAILURE,
        users
      }
    ];

    const store = mockStore({ users: [] });

    return store.dispatch(actions.fetchAllUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
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

