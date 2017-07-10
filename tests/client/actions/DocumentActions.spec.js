import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions
 from '../../../client/src/components/document/DocumentActions';
import * as types
from '../../../client/src/components/document/DocumentActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const documentId = 1;
const initialState = {
  documents: [],
  pagination: {},
  searchPagination: {},
  searchDocuments: [],
  isSearching: false,
  userDocuments: [],
  currentDocument: {},
  searchQuery: ''
};

// const data = {
//   documents: [
//     {
//       id: 1,
//       documentName: 'TestDocument1',
//       description: 'Description of testdocument',
//       access: 'private',
//       content: 'hello content of test document',
//       userId: 3
//     },
//     {
//       id: 3,
//       documentName: 'english',
//       description: 'For primary 2',
//       access: 'role',
//       content: 'children who learn english early are intelligent',
//       userId: 2
//     }
//   ],

//   pagination: {
//     page_count: 1,
//     page: 1,
//     page_size: 1,
//     total_count: 2
//   }
// };

describe('Actions', () => {
  it('should have a type of "FETCH_DOCUMENTS_SUCCESS"', () => {
    expect(actions.fetchDocumentsSuccess().type)
    .toEqual('FETCH_DOCUMENTS_SUCCESS');
  });

  it('should have a type of "FETCH_DOCUMENT_SUCCESS"', () => {
    expect(actions.fetchDocumentSuccess().type)
    .toEqual('FETCH_DOCUMENT_SUCCESS');
  });

  it('should have a type of "FETCH_USER_DOCUMENTS_SUCCESS"', () => {
    expect(actions.fetchUserDocumentSuccess().type)
    .toEqual('FETCH_USER_DOCUMENTS_SUCCESS');
  });

  it('should have a type of "CREATE_DOCUMENT_SUCCESS"', () => {
    expect(actions.createDocumentSuccess().type)
    .toEqual('CREATE_DOCUMENT_SUCCESS');
  });

  it('should have a type of "FETCH_SEARCH_SUCCESS"', () => {
    expect(actions.fetchSearchSuccess().type)
    .toEqual('FETCH_SEARCH_SUCCESS');
  });

  it('should have a type of "DELETE_DOCUMENT_SUCCESS"', () => {
    expect(actions.deleteDocumentSuccess().type)
    .toEqual('DELETE_DOCUMENT_SUCCESS');
  });

  it('should have a type of "UPDATE_DOCUMENT_SUCCESS"', () => {
    expect(actions.updateDocumentSuccess().type)
    .toEqual('UPDATE_DOCUMENT_SUCCESS');
  });

  it('should have a type of "SEARCH_FAILURE_MESSAGE"', () => {
    expect(actions.searchFailureMessage().type)
    .toEqual('SEARCH_FAILURE_MESSAGE');
  });

  it('should have a type of "DISPLAY_USER_FAILURE_MESSAGE"', () => {
    expect(actions.fetchUserDocumentFailed().type)
    .toEqual('DISPLAY_USER_FAILURE_MESSAGE');
  });

  it('should have a type of "CLEAR_SEARCH"', () => {
    expect(actions.clearSearch().type)
    .toEqual('CLEAR_SEARCH');
  });

  it('should have a type of "DISPLAY_DOCUMENT_FAILURE_MESSAGE"', () => {
    expect(actions.displayDocumentFailureMessage().type)
    .toEqual('DISPLAY_DOCUMENT_FAILURE_MESSAGE');
  });
});

describe('Document actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  

  describe('fetchDocuments Action', () => {
    const offset = 0;
    const limit = 6;
    it('Fetches all documents', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_DOCUMENTS_SUCCESS,
          data: {
            documents: [],
            pagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            },
          },
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.fetchAllDocuments(offset, limit))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            documents: [],
            pagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            },
          }
        });
      });
    });
  });

  describe('SearchDocument Action', () => {
    const offset = 0;
    const limit = 6;
    const searchQuery = 'The';
    it('searches documents', (done) => {
      const expectedActions = [
        {
          type: types.FETCH_SEARCH_SUCCESS,
          data: {
            searchDocuments: [],
            searchPagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            }
          },
          searchQuery
        }
      ];
      const store = mockStore(initialState);
      store.dispatch(actions.searchAllDocuments(searchQuery, offset, limit))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            searchDocuments: [],
            searchPagination: {
              pageCount: 0,
              page: 1,
              rowsPerPage: 6,
              totalCount: 0
            }
          }
        });
      });
    });
  });
});

