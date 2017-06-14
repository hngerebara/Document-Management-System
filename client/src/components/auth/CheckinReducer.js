import { CHECK_IN_SUCCESS, SIGN_OUT, CHECKIN_ERROR } from './AuthActions';

const initialState = {
  session: { loginSuccess: false },
  error: ''
};

const CheckinReducer = (state = initialState.session, action) => {
  if (!action) return state;
  switch (action.type) {
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        loginSuccess: true
      };
    case CHECKIN_ERROR:
      return { ...state,
        error: action.message,
        loginSuccess: false };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
};

export default CheckinReducer;
