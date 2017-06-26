import axios from 'axios';

const ROOT_URL = 'http://localhost:8090';

export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const DISPLAY_DOCUMENT_FAILURE_MESSAGE =
'DISPLAY_DOCUMENT_FAILURE_MESSAGE';
export const CREATE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const VIEW_DOCUMENT_SUCCESS = 'VIEW_DOCUMENT_SUCCESS';
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
export const DOCUMENT_FETCHED = 'DOCUMENT_FETCHED';
export const DISPLAY_USER_FAILURE_MESSAGE = 'DISPLAY_USER_FAILURE_MESSAGE';
export const FETCH_USER_DOCUMENTS_SUCCESS = 'FETCH_USER_DOCUMENTS_SUCCESS';
export const UPDATE_DOCUMENT_ERROR = 'UPDATE_DOCUMENT_ERROR';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const SEARCH_FAILURE_MESSAGE = 'SEARCH_FAILURE_MESSAGE';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const displayDocumentFailureMessage = errorMessage => ({
  type: DISPLAY_DOCUMENT_FAILURE_MESSAGE,
  errorMessage
});

export const fetchSearchSuccess = (data, searchQuery) => ({
  type: FETCH_SEARCH_SUCCESS,
  data,
  searchQuery
});

export const searchFailureMessage = errorMessage => ({
  type: SEARCH_FAILURE_MESSAGE,
  errorMessage
});

export const fetchDocumentsSuccess = data => ({
  type: FETCH_DOCUMENTS_SUCCESS,
  data
});

export const createDocumentSuccess = document => ({
  type: CREATE_DOCUMENT_SUCCESS,
  document,
});

export const updateDocumentSuccess = document => ({
  type: UPDATE_DOCUMENT_SUCCESS,
  document,
});

export const viewDocumentSuccess = document => ({
  type: VIEW_DOCUMENT_SUCCESS,
  document
});

export const fetchUserDocumentFailed = userDocumentsError => ({
  type: DISPLAY_USER_FAILURE_MESSAGE,
  userDocumentsError
});

export const fetchUserDocumentSuccess = userDocuments => ({
  type: FETCH_USER_DOCUMENTS_SUCCESS,
  userDocuments
});

export const deleteDocumentSuccess = document => ({
  type: DELETE_DOCUMENT_SUCCESS,
  document,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const fetchAllDocuments = (offset=0, limit=6) => (dispatch) => {
  axios.get(`${ROOT_URL}/documents?limit=${limit}&offset=${offset}`)
  .then((response) => {
    dispatch(fetchDocumentsSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });
};

export const viewDocument = documentId => (dispatch) => {
  axios.get(`${ROOT_URL}/documents/${documentId}/`, document)
      .then((response) => {
        dispatch(viewDocumentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(displayDocumentFailureMessage(error.response));
        throw error;
      });
};

export const fetchUserDocuments = creatorId => (dispatch) => {
  axios.get(`${ROOT_URL}/users/${creatorId}/documents`, creatorId)
  .then((response) => {
    dispatch(fetchUserDocumentSuccess(response.data.allDocuments));
  })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });
};

export const createDocument = document => (dispatch) => {
  axios.post(`${ROOT_URL}/documents`, document)
    .then(() => {
      document.id ? dispatch(updateDocumentSuccess(document)) :
        dispatch(createDocumentSuccess(document));
    }).catch((error) => {
      dispatch(displayDocumentFailureMessage(error.response.statusText));
      throw error;
    });
};

export const searchAllDocuments = (search, offset = 0, limit = 6) => (dispatch) => {
  axios.get(`${ROOT_URL}/search/documents?search=${search}&limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(fetchSearchSuccess(response.data, search));
    }).catch((error) => {
      dispatch(searchFailureMessage(error.response));
      throw error;
    });
};


export const deleteDocument = documentId => (dispatch) => {
  axios.delete(`${ROOT_URL}/documents/${documentId}/`)
    .then((response) => {
      dispatch(deleteDocumentSuccess(response.data.message));
      dispatch(fetchAllDocuments());
    })
  .catch((error) => {
    dispatch(displayDocumentFailureMessage(error.response));
    throw error;
  });
};

export const updateDocument = (documentId, updatedDocument) => (dispatch) => {
  axios.put(`/documents/${documentId}`, updatedDocument)
    .then(() => {
      dispatch({ UPDATE_DOCUMENT_SUCCESS, updatedDocument });
    }).catch((error) => {
      dispatch({ UPDATE_DOCUMENT_ERROR, error });
    });
};
