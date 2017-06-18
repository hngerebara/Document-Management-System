import { FETCH_DOCUMENTS_SUCCESS, DISPLAY_FAILURE_MESSAGE,
CREATE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_SUCCESS,
FETCH_DOCUMENT_SUCCESS, EDIT_DOCUMENT_SUCCESS, DOCUMENT_FETCHED } from './DocumentActions';

import { browserHistory } from 'react-router';

export default function DocumentsReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FAILURE_MESSAGE:
      return { ...state, status: action.status };

    case FETCH_DOCUMENTS_SUCCESS:
      return action.documents;

    case CREATE_DOCUMENT_SUCCESS:
      browserHistory.push('/documents');
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)
      ];

    case EDIT_DOCUMENT_SUCCESS:
      browserHistory.push('/documents');
      return state.map((document) => {
        if (document.id === action.document.id) return action.document;
        return document;
      });

    case DELETE_DOCUMENT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfDocumentToDelete = state.findIndex(document =>
      document.id === action.document.id);
      newState.splice(indexOfDocumentToDelete, 1);
      browserHistory.push('/documents');
      return newState;
    }

    default:
      return state;
  }
}

