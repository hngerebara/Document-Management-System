import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../../client/src/components/auth/AuthActionTypes';
import * as actions from '../../../client/src/components/auth/AuthActions';
import setAuthorizationToken from '../../../client/src/utils/setAuthToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'token';
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

  it('should successful login a user', (done) => {
    moxios.stubRequest('api/users/login', {
      status: 200,
      response: {
        token,
        message: 'Login successful',
      }
    });
    moxios.withMock(() => {
      const expectedActions = [
        {
          type: types.SET_CURRENT_USER,
          token: 'token'
        }
      ];
      const store = mockStore({ users: {} });
      store.dispatch(actions.checkinUserAction(user))
      .then(() => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              data: {
                token: 'token',
                user
              },
            }
          });
        }).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      })
      .catch(done);
    });
  });
    it('should have a type of "SET_CURRENT_USER"', () => {
      expect(actions.setCurrentUser().type).toEqual('SET_CURRENT_USER');
    });


  // it('should successful login a user', (done) => {
  //   moxios.withMock(() => {
  //     const expectedActions = [
  //       {
  //         type: types.SET_CURRENT_USER,
  //         token: 'token'
  //       }
  //     ];
  //     const store = mockStore({ users: {} });
  //     store.dispatch(actions.checkinUserAction(user))
  //     .then(() => {
  //       moxios.wait(() => {
  //         const request = moxios.requests.mostRecent();
  //         request.respondWith({
  //           status: 200,
  //           response: {
  //             data: {
  //               token: 'token',
  //               user
  //             },
  //           }
  //         });
  //       }).then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //         done();
  //       });
  //     })
  //     .catch(done);
  //   });
  // });
});
