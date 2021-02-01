import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../../client/src/components/auth/AuthActionTypes';
import signupUser from '../../../client/src/components/auth/SignupActions';

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
    moxios.stubRequest('/users', {
      status: 201,
      response: {
        token: 'token',
        user: { username: 'hopez',
          firstName: 'Hope',
          lastName: 'Ngerebara',
          email: 'hopez@gmail.com',
          roleId: 2 }
      }
    });
    const expectedActions = [
      {
        type: types.SIGNUP_SUCCESS,
        token
      }
    ];
    const store = mockStore({});
    store.dispatch(signupUser(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          token
        }
      });
    });
    done();
  });
});
