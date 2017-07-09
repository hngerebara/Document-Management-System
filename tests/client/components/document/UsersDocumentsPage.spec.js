import React from 'react';
import { mount, render } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { UsersDocumentsPage } from '../../../../client/src/components/document/userDocuments/UsersDocumentsPage';

const mockStore = configureMockStore();

const setup = () => {
  const manageDocuments = {
    documents: [],
    pagination: {},
    searchPagination: {},
    searchDocuments: [],
    isSearching: false,
    userDocuments: [],
    currentDocument: {},
    searchQuery: ''
  };
  const user = {
    id: 2,
    email: 'hopez@ymail.com',
    firstName: 'Hope',
    lastName: 'HopezLastName',
    password: '12345',
  };

  const props = {
    mockDeleteDocument: jest.fn(),
    mockFetchUserDocuments: jest.fn(),
    mockSearchAllDocuments: jest.fn(),
    mockClearSearch: jest.fn(),
    mockViewDocument: jest.fn(),
    params: {
      creatorId: 1
    }
  };

  const DocumentReducer = {
    documents: [],
    pagination: {},
    searchPagination: {},
    searchDocuments: [],
    isSearching: false,
    userDocuments: [],
    currentDocument: {},
    searchQuery: ''
  };
  const initialState = {
    Auth: {
      user: {}
    },
    DocumentReducer
  }
  const store = mockStore(initialState);
  
  UsersDocumentsPage.prototype.viewDocument = sinon.spy();

  const wrapper = mount(
    <Provider store={store} >  
    <UsersDocumentsPage
      user={user}
      manageDocuments={manageDocuments}
      searchUserDocuments={props.mockFetchUserDocuments}
      fetchUserDocuments={props.mockFetchUserDocuments}
      clearSearch={props.mockClearSearch}
      deleteDocument={props.mockDeleteDocument}
      viewDocument={props.mockViewDocument}
      params={props.params}
    />
    </Provider>);

  return {
    props,
    wrapper,
    manageDocuments,
    user
  };
};

describe('UsersDocumentsPage components', () => {
  const { wrapper, props } = setup();
  describe('SideBar', () => {
    it('renders html elements', () => {
      expect(wrapper.find('div').length).toBe(10);
      expect(wrapper.find('h1').length).toBe(1);
    });

    it('should render subcomponent UserDocumentList', () => {
      const UsersDocumentsListProps = wrapper.find('UserDocumentList').props();
      wrapper.props().children.props.viewDocument();
      expect(UsersDocumentsListProps.deleteDocument).toEqual(props.mockDeleteDocument);
    });
  });
});

