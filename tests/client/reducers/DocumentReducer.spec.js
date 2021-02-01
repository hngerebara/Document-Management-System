import DocumentReducer
  from '../../../client/src/components/document/DocumentReducer';
import * as types
  from '../../../client/src/components/document/DocumentActionTypes';

describe('Document Reducer', () => {
  let initialState;
  let data;
  initialState = {
    documents: [],
    pagination: {},
    searchPagination: {},
    searchDocuments: [],
    isSearching: false,
    userDocuments: [],
    currentDocument: {},
    searchQuery: ''
  };
  data = {
    pagination: {
      pageCount: 1,
      page: 1,
      rowsPerPage: 6,
      totalCount: 2
    },
    documents: [
      {
        id: 1,
        documentName: 'maths',
        description: 'For primary 1',
        access: 'private',
        content: 'children who learn maths early are intelligent',
        createdAt: '2017-06-29T15:01:18.038Z',
        updatedAt: '2017-06-29T15:01:18.038Z',
        creatorId: 3
      },
      {
        id: 3,
        documentName: 'english',
        description: 'For primary 2',
        access: 'role',
        content: 'children who learn english early are intelligent',
        createdAt: '2017-06-29T15:01:18.038Z',
        updatedAt: '2017-06-29T15:01:18.038Z',
        creatorId: 3
      }
    ]
  };

  describe('Manage Document reducer', () => {
    it('should return the initial state', () => {
      const expectedResult = {
        documents: [],
        pagination: {},
        searchPagination: {},
        searchDocuments: [],
        isSearching: false,
        userDocuments: [],
        currentDocument: {},
        searchQuery: ''
      };
      expect(DocumentReducer(initialState, {})).toEqual(expectedResult);
    });
  });

  describe('CREATE_DOCUMENT_SUCCESS', () => {
    it('should add a created document to the store', () => {
      initialState.documents = data;
      const document = {
        id: 4,
        documentName: 'chemistry',
        description: 'For primary 4',
        access: 'private',
        content: 'children who learn chemistry early are intelligent'
      };

      const action = {
        type: types.CREATE_DOCUMENT_SUCCESS,
        document
      };
      const newState = DocumentReducer(data, action);

      expect(newState).not.toBe(initialState);
      expect(newState.documents).toHaveLength(3);
      expect(newState.documents[0].documentName).toEqual('chemistry');
      expect(newState.documents[0].description).toEqual('For primary 4');
      expect(newState.documents[0].access).toEqual('private');
      expect(newState.documents[0].content).toEqual(
        'children who learn chemistry early are intelligent'
      );
      expect(newState.documents[0].id).toEqual(4);
    });
  });

  describe('FETCH_DOCUMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_DOCUMENTS_SUCCESS,
      data: {
        documents: data.documents,
        pagination: data.pagination
      }
    };
    const expectedResult = {
      documents: data.documents,
      pagination: data.pagination,
      searchPagination: {},
      searchDocuments: [],
      isSearching: false,
      userDocuments: [],
      currentDocument: {},
      searchQuery: ''
    };

    it('should get all documents', () => {
      expect(DocumentReducer(initialState, action)).toEqual(expectedResult);
    });
  });

  describe('FETCH_USER_DOCUMENTS_SUCCESS', () => {
    it('should retrieve user documents', () => {
      expect(DocumentReducer(undefined, {
        type: types.FETCH_USER_DOCUMENTS_SUCCESS,
        userDocuments: data.documents,

      })).toEqual({
        documents: [],
        pagination: {},
        searchPagination: {},
        searchDocuments: [],
        isSearching: false,
        userDocuments: data.documents,
        currentDocument: {},
        searchQuery: ''
      });
    });
  });

  describe('FETCH_DOCUMENT_SUCCESS', () => {
    it('should handle FETCH_DOCUMENT_SUCCESS', () => {
      const retrievedDocument = data.documents[1];
      const action = {
        type: types.FETCH_DOCUMENT_SUCCESS,
        document: retrievedDocument
      };
      const newState = DocumentReducer(initialState, action);
      const expectedResult = {
        ...initialState,
        currentDocument: retrievedDocument,
        documents: [
          ...initialState.documents,
          retrievedDocument
        ],
      };
      expect(newState).toEqual(expectedResult);
      expect(newState.currentDocument.documentName).toEqual('english');
      expect(newState.currentDocument.description).toEqual('For primary 2');
    });
  });

  describe('DELETE_DOCUMENT_SUCCESS', () => {
    it('should delete an existing document on DELETE_DOCUMENT_SUCCESS', () => {
      const indexOfDocument = data.documents[0].id;
      const action = {
        type: types.DELETE_DOCUMENT_SUCCESS,
        documentId: indexOfDocument
      };
    const newState = DocumentReducer({
      ...data,
      userDocuments: data.documents
    }, action);
    const expectedResult = {
      ...initialState,
      document: indexOfDocument,
      userDocuments: [
        ...data.documents.slice(0, indexOfDocument),
        ...data.documents.slice(indexOfDocument + 1)
      ]
    };
    const newStateResult= newState.userDocuments.length;
    expect(newStateResult).toEqual(expectedResult.userDocuments.length);
    });
  });
});

