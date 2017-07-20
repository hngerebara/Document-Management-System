import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../../client/src/components/auth/AuthActionTypes';
import * as actions from '../../../client/src/components/auth/AuthActions';

const initialState = {
  isAuthenticated: false,
  user: {}
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
  email: 'hopez@gmail.com',
  password: 'coolgirl'
};
describe('Authentication actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should successfully login a user', (done) => {
    moxios.stubRequest('/users/login', {
      status: 200,
      response: {
        data: {
          token: 'token'
        },
      }
    });
    const expectedActions = [
      {
        type: types.SET_CURRENT_USER,
        user
      }
    ];
    const store = mockStore(initialState);
    store.dispatch(actions.checkinUserAction(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token
        }
      });
    });
    done();
  });


  it('should have a type of "SET_CURRENT_USER"', () => {
    expect(actions.setCurrentUser().type).toEqual('SET_CURRENT_USER');
  });
});
