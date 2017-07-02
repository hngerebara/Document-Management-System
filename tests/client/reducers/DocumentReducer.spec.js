import DocumentReducer from '../../../client/src/components/document/DocumentReducer';
import * as actions
from '../../../client/src/components/document/DocumentActions';

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

const documents = [
  {
    id: 1,
    documentName: 'maths',
    description: 'For primary 1',
    access: 'private',
    content: 'children who learn maths early are intelligent',
    userId: 2
  },
  {
    id: 3,
    documentName: 'english',
    description: 'For primary 2',
    access: 'role',
    content: 'children who learn english early are intelligent',
    userId: 2
  }
];

const pagination = {
  page_count: 1,
  page: 1,
  page_size: 1,
  total_count: 2
};


describe('Manage Document reducer', () => {
  it('should return the initial state', () => {
    expect(DocumentReducer(undefined, {})).toEqual({
      documents: [],
      pagination: {},
      searchPagination: {},
      searchDocuments: [],
      isSearching: false,
      userDocuments: [],
      currentDocument: {},
      searchQuery: ''
    });
  });

  it('should get all documents', () => {
    expect(DocumentReducer(undefined, {
      type: 'FETCH_DOCUMENTS_SUCCESS',
      data: {
        documents: [documents],
        pagination
      }
    })).toEqual({
      documents: [documents],
      pagination,
      searchPagination: {},
      searchDocuments: [],
      isSearching: false,
      userDocuments: [],
      currentDocument: {},
      searchQuery: ''
    });
  });


  it('should retrieve user documents', () => {
    expect(DocumentReducer(undefined, {
      type: 'FETCH_USER_DOCUMENTS_SUCCESS',
      userDocuments: [documents],

    })).toEqual({
      documents: [],
      pagination: {},
      searchPagination: {},
      searchDocuments: [],
      isSearching: false,
      userDocuments: [documents],
      currentDocument: {},
      searchQuery: ''
    });
  });

  // it('should handle CREATE_DOCUMENT_SUCCESS', () => {
  //   const createdDocument = {
  //     id: 4,
  //     documentName: 'chemistry',
  //     description: 'For primary 4',
  //     access: 'private',
  //     content: 'children who learn chemistry early are intelligent',
  //     userId: 2
  //   };
  //   const action = {
  //     type: 'CREATE_DOCUMENT_SUCCESS',
  //     document: createdDocument
  //   };
  //   const newState = DocumentReducer(initialState, action);
  //   let expectedResult = {
  //     ...initialState,
  //     document: createdDocument,
  //     count: initialState.documents + 1,
  //     documents: [
  //       createdDocument,
  //       ...initialState.documents,
  //     ],
  //   };
  //   expectedResult = 3;
  //   const actual = newState.documents.length;
  //   expect(actual).toEqual(expectedResult);
  // });

  it('should handle FETCH_DOCUMENT_SUCCESS', () => {
    const retrievedDocument = documents[1];
    const action = {
      type: 'FETCH_DOCUMENT_SUCCESS',
      document: retrievedDocument
    };
    const reducerResult = DocumentReducer(initialState, action);
    const expectedResult = {
      ...initialState,
      currentDocument: retrievedDocument,
      documents: [
        ...initialState.documents,
        retrievedDocument
      ],
    };
    expect(reducerResult).toEqual(expectedResult);
  });


  it('should delete an existing document on DELETE_DOCUMENT_SUCCESS', () => {
    const indexOfDocument = documents[0].id;
    const action = {
      type: 'DELETE_DOCUMENT_SUCCESS',
      document: indexOfDocument
    };
    let expectedResult;
    const newState = DocumentReducer(initialState, action);
    expectedResult = {
      ...initialState,
      document: indexOfDocument,
      documents: [
        ...initialState.documents.slice(0, indexOfDocument),
        ...initialState.documents.slice(indexOfDocument + 1)
      ]
    };
    expectedResult = 1;
    const actual = newState.documents.length;
    expect(actual).toEqual(expectedResult);
  });
});

