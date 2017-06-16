import { FETCH_DOCUMENTS_SUCCESS, DISPLAY_FAILURE_MESSAGE,
CREATE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_SUCCESS,
FETCH_DOCUMENT_SUCCESS, EDIT_DOCUMENT_SUCCESS, DOCUMENT_FETCHED } from './DocumentActions';

export default function DocumentsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_DOCUMENTS_SUCCESS:
      return action.documents;

    case CREATE_DOCUMENT_SUCCESS:
      return action.documents;

    case DISPLAY_FAILURE_MESSAGE:
      return { ...state, status: action.status };

    case EDIT_DOCUMENT_SUCCESS:
      return state.map((document) => {
        if (document.id === action.document.id) return action.document;
        return document;
      });

    case DOCUMENT_FETCHED:
      const index = state.findIndex(document => document.id === action.document.id);
      if (index > -1) {
        return state.map((document) => {
          if (document.id === action.document.id) return action.document;
          return document;
        });
      }
      return [
        ...state,
        action.document
      ];

    default:
      return state;
  }
}

