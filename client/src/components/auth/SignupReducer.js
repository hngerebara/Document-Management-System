import { SIGNUP_SUCCESS, SIGNUP_ERROR } from './AuthActions';

const initialState = {
  session: { loginSuccess: false },
  error: ''
};

export default function SignupReducer(state = initialState.session, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loginSuccess: true
      };
    case SIGNUP_ERROR:
      return { ...state,
        error: action.message,
        loginSuccess: false };
    default:
      return state;
  }
}
