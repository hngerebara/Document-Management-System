import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS,
  DISPLAY_FAILURE_MESSAGE } from './UsersActions';

export default function UsersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.users;

    case DELETE_USER_SUCCESS: {
      const indexOfUserToDelete = state.findIndex(
        user => user.id === action.userId);
      return [
        ...state.slice(0, indexOfUserToDelete),
        ...state.slice(indexOfUserToDelete + 1)
      ];
    }

    default:
      return state;
  }
}
