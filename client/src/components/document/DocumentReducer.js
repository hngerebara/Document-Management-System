import { FETCH_DOCUMENTS_SUCCESS, DISPLAY_FAILURE_MESSAGE,
CREATE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_SUCCESS,
FETCH_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_SUCCESS, 
FETCH_USER_DOCUMENTS_SUCCESS, FETCH_USER_DOCUMENTS_FAILED,
DOCUMENT_FETCHED } from './DocumentActions';

import { browserHistory } from 'react-router';

const initialState = {
  documents: [],
  userDocuments: [],
  document: {}
};
export default function DocumentsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_FAILURE_MESSAGE:
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
      };

    case FETCH_USER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        userDocuments: [
          ...state.userDocuments,
          ...action.userDocuments
        ],
      };

    case FETCH_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.document
      };

    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.document
      };

    // case UPDATE_DOCUMENT_SUCCESS:
    //   return {}
    //     ...state.filter(document => document.id !== action.document.id),
    //     Object.assign({}, action.course)
    //   };

    case DELETE_DOCUMENT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfDocumentToDelete = state.findIndex(document =>
      document.id === action.document.id);
      newState.splice(indexOfDocumentToDelete, 1);
      browserHistory.push('/documents');
      return newState;
    }
// case DELETE_DOCUMENT_SUCCESS: {
//   const indexOfUserToDelete = state.document.findIndex(
//         document => document.id === action.document.id);
//       return [
//         ...state.slice(0, indexOfDocumentToDelete),
//         ...state.slice(indexOfDocumentToDelete + 1)
//       ];
// }
      
    default:
      return state;
  }
}

