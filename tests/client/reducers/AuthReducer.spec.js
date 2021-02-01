import AuthReducer from '../../../client/src/components/auth/AuthReducer';

const user = {
  uaername: 'Hope',
  firstName: 'Hope',
  lastName: 'Ngere',
  email: 'h.ngere@gmail.com',
  password: '1234567'
};
describe('Authentication reducer', () => {
  it('should return the initial state', () => {
    expect(AuthReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should change the initial state', () => {
    expect(AuthReducer(undefined, {
      type: 'SET_CURRENT_USER',
      user
    })).toEqual({
      isAuthenticated: true,
      user
    });
  });


  it('should handle SET_CURRENT_USER', () => {
    expect(
      AuthReducer({}, {
        type: 'SET_CURRENT_USER',
        user: {}
      })
    ).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
});
