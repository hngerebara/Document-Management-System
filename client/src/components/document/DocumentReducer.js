import { FETCH_DOCUMENTS_SUCCESS, CREATE_DOCUMENT_SUCCESS,
DELETE_DOCUMENT_SUCCESS, VIEW_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_SUCCESS,
FETCH_USER_DOCUMENTS_SUCCESS, DISPLAY_DOCUMENT_FAILURE_MESSAGE,
 FETCH_SEARCH_SUCCESS, CLEAR_SEARCH } from './DocumentActions';

const initialState = {
  documents: [],
  searchDocuments: [],
  isSearching: false,
  userDocuments: [],
  document: {},
  count: 0,
  page: 1,

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
      return {
        ...state,
        documents: [
          ...state.documents,
          ...action.documents
        ],
        // count: [
        //   ...state.count,
        //   ...action.count
        // ]
      };

    case FETCH_USER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        userDocuments: [
          ...state.userDocuments,
          ...action.userDocuments
        ],
      };

    case VIEW_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.document
      };

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
      return {
        ...state,
        searchDocuments: action.documents,
        isSearching: true
      };

      case CLEAR_SEARCH:
      return {
        ...state,
        searchDocuments: [],
        isSearching: false
      };

    default:
      return state;
  }
}

