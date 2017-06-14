import * as types from './DocumentActions';

export default function DocumentsReducer(state = [], action) {
  switch (action.type) {
    case types.FETCH_DOCUMENTS_SUCCESS:
    console.log('FETCH_DOCUMENTS_SUCCESS')
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      return [...state,
        Object.assign({}, action.document)
      ];
    case types.CREATE_DOCUMENT_ERROR:
      return { ...state, status: action.status };
    case types.FETCH_DOCUMENT_BY_ID_SUCCESS:
      return action.document;
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)
      ];
    default:
      return state;
  }
}

