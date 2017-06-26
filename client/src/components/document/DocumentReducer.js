import { FETCH_DOCUMENTS_SUCCESS, CREATE_DOCUMENT_SUCCESS,
DELETE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_SUCCESS,
FETCH_USER_DOCUMENTS_SUCCESS, DISPLAY_DOCUMENT_FAILURE_MESSAGE,
 FETCH_SEARCH_SUCCESS, CLEAR_SEARCH } from './DocumentActions';

const initialState = {
  documents: [],
  pagination: {},
  searchPagination: {},
  searchDocuments: [],
  isSearching: false,
  userDocuments: [],
  document: {},
  searchQuery: '',
};
export default function DocumentsReducer(state = initialState, action) {
  let indexOfDocument = 0;
  switch (action.type) {
    case DISPLAY_DOCUMENT_FAILURE_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    case FETCH_DOCUMENTS_SUCCESS:
      const { documents, pagination } = action.data;
      return {
        ...state,
        documents,
        pagination,
      };

    case FETCH_USER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        userDocuments: [
          ...state.userDocuments,
          ...action.userDocuments
        ],
      };

    // case VIEW_DOCUMENT_SUCCESS:
    //   return {
    //     ...state,
    //     document: action.document
    //   };

    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.document,
        count: state.count + 1,
        documents: [
          ...state.documents,
          action.document,
        ]
      };

    case UPDATE_DOCUMENT_SUCCESS:
      idx = state.documents.findIndex(document =>
      document.id === action.document.id);
      if (indexOfDocument === -1) {
        return {
          ...state,
          document: action.document
        };
      }
      return {
        ...state,
        document: action.document,
        documents: [
          ...state.documents.slice(0, indexOfDocument),
          action.document,
          ...state.documents.slice(indexOfDocument + 1),
        ]
      };


    case DELETE_DOCUMENT_SUCCESS:
      indexOfDocument = state.documents.findIndex(document =>
      document.id === action.document.id);
      if (indexOfDocument === -1) {
        return {
          ...state,
          document: undefined
        };
      }
      return {
        ...state,
        document: undefined,
        count: state.count - 1,
        documents: [
          ...state.documents.slice(0, indexOfDocument),
          ...state.documents.slice(indexOfDocument + 1)
        ]
      };

    case FETCH_SEARCH_SUCCESS:
      const { searchDocuments, searchPagination } = action.data;
      return {
        ...state,
        searchDocuments,
        searchPagination,
        isSearching: true,
        searchQuery: action.searchQuery,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchDocuments: [],
        searchPagination: {},
        isSearching: false
      };

    default:
      return state;
  }
}

