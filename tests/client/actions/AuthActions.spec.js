import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../client/src/components/admin/manageUsers/UsersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const user = {
  email: 'hopez@gmail.com',
  password: 'coolgirl',
};

describe('Authentication actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should create action LOGIN_SUCCESS after successful login', () => {
    const store = mockStore({ users: {} });
    const token = 'authToken';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'success',
          status: '200',
          token
        },
      });
    });
    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        token
      }
    ];

    return store.dispatch(actions.checkinUserAction(user))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should have a type of "FETCH_USERS_SUCCESS"', () => {
    expect(actions.setCurrentUser().type).toEqual('SET_CURRENT_USER');
  });
});



