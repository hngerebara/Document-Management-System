import axios from 'axios';

const ROOT_URL = 'http://localhost:8090';

export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const DISPLAY_FAILURE_MESSAGE = 'DISPLAY_FAILURE_MESSAGE';
export const CREATE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const VIEW_DOCUMENT_SUCCESS = 'VIEW_DOCUMENT_SUCCESS';
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
export const DOCUMENT_FETCHED = 'DOCUMENT_FETCHED';
export const DISPLAY_USER_FAILURE_MESSAGE = 'DISPLAY_USER_FAILURE_MESSAGE';
export const FETCH_USER_DOCUMENTS_SUCCESS = 'FETCH_USER_DOCUMENTS_SUCCESS';


export const displayFailureMessage = errorMessage => ({
  type: DISPLAY_FAILURE_MESSAGE,
  errorMessage
});

export const fetchDocumentsSuccess = documents => ({
  type: FETCH_DOCUMENTS_SUCCESS,
  documents
});

export const createDocumentSuccess = document => ({
  type: CREATE_DOCUMENT_SUCCESS,
  document,
});

export const updateDocumentSuccess = (document) => ({
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

export const fetchAllDocuments = () => (dispatch) => {
  console.log('fetch all documents getting called');
  axios.get(`${ROOT_URL}/documents`)
  .then((response) => {
    dispatch(fetchDocumentsSuccess(response.data));
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

export const viewDocument = documentId => (dispatch) => {
  console.log('fetch single document getting called');
  axios.get(`${ROOT_URL}/documents/${documentId}/`, document)
      .then((response) => {
        console.log(response,"response from viewing single document")
        dispatch(viewDocumentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(displayFailureMessage(error.response));
        throw error;
      });
};

export const fetchUserDocuments = creatorId => (dispatch) => {
  console.log('fetch user documents getting called');
  axios.get(`${ROOT_URL}/users/${creatorId}/documents`, creatorId)
  .then((response) => {
    dispatch(fetchUserDocumentSuccess(response.data.allDocuments));
  })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

export const createDocument = document => (dispatch) => {
  axios.post(`${ROOT_URL}/documents`, document)
    .then(() => {
      document.id ? dispatch(updateDocumentSuccess(document)) :
        dispatch(createDocumentSuccess(document));
    }).catch((error) => {
      dispatch(displayFailureMessage(error.response.statusText));
      throw error;
    });
};

export const deleteDocument = documentId => (dispatch) => {
  console.log('getting to delete document action');
  axios.delete(`${ROOT_URL}/documents/${documentId}/`)
    .then((response) => {
      dispatch(deleteDocumentSuccess(response.data.message));
      dispatch(fetchAllDocuments());
    })
  .catch((error) => {
    dispatch(displayFailureMessage(error.response));
    throw error;
  });
};

