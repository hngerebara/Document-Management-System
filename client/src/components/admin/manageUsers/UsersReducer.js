import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS,
 SEARCH_USERS_SUCCESS, CLEAR_SEARCH } from './UsersActions';


const initialState = {
  users: [],
  isSearching: false,
  pagination: {},
  searchPagination: {},
  searchUsers: [],
  currentUser: {},
  searchQuery: ''
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
      const { searchUsers, searchPagination } = action.data;
      return {
        ...state,
        searchUsers,
        searchPagination,
        isSearching: true,
        searchQuery: action.searchQuery,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchUsers: [],
        searchPagination: {},
        isSearching: false
      };


    case DELETE_USER_SUCCESS: {
      const indexOfUserToDelete = state.find(
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

