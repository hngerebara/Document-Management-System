import axios from '../../utils/api';
import toastr from 'toastr';
import * as types from './DocumentActionTypes';

export const displayDocumentFailureMessage = errorMessage => ({
  type: types.DISPLAY_DOCUMENT_FAILURE_MESSAGE,
  errorMessage
});

export const fetchSearchSuccess = (data, searchQuery) => ({
  type: types.FETCH_SEARCH_SUCCESS,
  data,
  searchQuery
});

export const searchFailureMessage = errorMessage => ({
  type: types.SEARCH_FAILURE_MESSAGE,
  errorMessage
});

export const fetchDocumentsSuccess = data => ({
  type: types.FETCH_DOCUMENTS_SUCCESS,
  data
});

export const createDocumentSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS,
  document,
});

export const updateDocumentSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS,
  document,
});

export const fetchDocumentSuccess = document => ({
  type: types.FETCH_DOCUMENT_SUCCESS,
  document
});

export const fetchUserDocumentFailed = userDocumentsError => ({
  type: types.DISPLAY_USER_FAILURE_MESSAGE,
  userDocumentsError
});

export const fetchUserDocumentSuccess = userDocuments => ({
  type: types.FETCH_USER_DOCUMENTS_SUCCESS,
  userDocuments
});

export const deleteDocumentSuccess = documentId => ({
  type: types.DELETE_DOCUMENT_SUCCESS,
  documentId,
});

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH,
});

export const fetchAllDocuments = (offset = 0, limit = 6) => dispatch =>
  axios.get(`/documents?limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch(fetchDocumentsSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });

export const fetchDocument = documentId => dispatch =>
  axios.get(`/documents/${documentId}/`)
    .then((response) => {
      dispatch(fetchDocumentSuccess(response.data.document));
    })
    .catch((error) => {
      dispatch(displayDocumentFailureMessage(error.response));
      throw error;
    });

export const fetchUserDocuments = creatorId => dispatch =>
  axios.get(`/users/${creatorId}/documents`, creatorId)
  .then((response) => {
    dispatch(fetchUserDocumentSuccess(response.data.user.allDocuments));
  })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });

export const createDocument = document => dispatch =>
  axios.post('/documents', document)
    .then((res) => {
      dispatch(createDocumentSuccess(res.data));
    }).catch((error) => {
      dispatch(displayDocumentFailureMessage(error.response.statusText));
      throw error;
    });

export const searchAllDocuments = (search, offset = 0, limit = 6) => dispatch =>
  axios.get(`/search/documents?search=${search}&limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(fetchSearchSuccess(response.data, search));
    }).catch((error) => {
      dispatch(searchFailureMessage(error.response));
      throw error;
    });

export const deleteDocument = documentId => (dispatch) => {
  axios.delete(`/documents/${documentId}/`)
    .then(() => {
      dispatch(deleteDocumentSuccess(documentId));
    })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });
};

// export const updateDocument = (documentId, updatedDocument) => (dispatch) =>
//   axios.put(`/documents/${documentId}`, updatedDocument)
//     .then(() => {
//       dispatch({ UPDATE_DOCUMENT_SUCCESS, updatedDocument });
//     }).catch((error) => {
//       dispatch({ UPDATE_DOCUMENT_ERROR, error });
//     });
