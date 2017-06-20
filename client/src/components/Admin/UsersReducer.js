import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS,
  DISPLAY_FAILURE_MESSAGE } from './UsersActions';

export default function UsersReducer(state = [], action) {
  switch (action.type) {

    case DISPLAY_FAILURE_MESSAGE:
      return { ...state, status: action.status };

    case FETCH_USERS_SUCCESS:
      return action.users;

    case DELETE_USER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfUserToDelete = state.findIndex(user =>
      user.id === action.user.id);
      newState.splice(indexOfUserToDelete, 1);
      browserHistory.push('/users');
      return newState;
    }

    default:
      return state;
  }
}
