import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import expect from 'expect';
import thunk from 'redux-thunk';
import axios from '../../../client/src/utils/api';
import * as actions from '../../../client/src/components/document/DocumentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = {
  documents: [
    {
      id: 1,
      documentName: 'TestDocument1',
      description: 'Description of testdocument',
      access: 'private',
      content: 'hello content of test document',
      userId: 3
    },
    {
      id: 3,
      documentName: 'english',
      description: 'For primary 2',
      access: 'role',
      content: 'children who learn english early are intelligent',
      userId: 2
    }
  ],

  pagination: {
    page_count: 1,
    page: 1,
    page_size: 1,
    total_count: 2
  }
};

describe('Document Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch create an action to fetch users', () => {
    nock(API_URL)
      .get('/documents')
      .reply(200, {
        data: {
          documents: [],
          pagination: {}
        }
      });

    const expectedActions = [
      {
        type: 'FETCH_DOCUMENTS_SUCCESS',
        data
      },
      {
        type: 'DISPLAY_DOCUMENT_FAILURE_MESSAGE',
        errorMessage
      }
    ];

    const store = mockStore({ data: {} });

    return store.dispatch(actions.fetchAllUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

