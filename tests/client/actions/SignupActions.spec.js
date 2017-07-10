import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../../client/src/components/auth/AuthActionTypes';
import * as actions from '../../../client/src/components/auth/SignupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'token';
const user = {
  username: 'hopez',
  firstName: 'Hope',
  lastName: 'Ngerebara',
  email: 'hopez@gmail.com',
  password: '12345'
};

describe('Signup actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should successfully signup a user', (done) => {
    const expectedActions = [
      {
        type: types.SIGNUP_SUCCESS,
        token
      }
    ];
    const store = mockStore({ users: {} });
    store.dispatch(actions.signupUser(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            token: 'token'
          },
        }
      });
    });
  });
});
