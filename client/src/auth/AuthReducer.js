import { CHECK_IN_SUCCESS, SIGN_OUT } from "./AuthActions";
import { browserHistory } from "react-router";

const initialState = {
  session: { loginSuccess: false }
}

export default function AuthReducer(state = initialState.session, action) {
  switch (action.type) {
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        loginSuccess: true
      }

    case SIGN_OUT:
      browserHistory.push("/");
      return !!sessionStorage.jwt;

    default:
      return state;
  }
}
