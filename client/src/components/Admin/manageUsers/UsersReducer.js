import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS,
 SEARCH_USERS_SUCCESS } from './UsersActions';


const initialState = {
  users: [],
  isSearching: false,
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users,
          ...action.users
        ],
      };

    case SEARCH_USERS_SUCCESS:
      return [
        ...state,
        action.usersSearch
      ];

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
};


