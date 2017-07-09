import React from 'react';
import { shallow } from 'enzyme';
import { AllDocumentsPage } from '../../../../client/src/components/document/otherDocuments/AllDocumentsPage';
import AllDocumentsList from '../../../../client/src/components/document/otherDocuments/AllDocumentsList';

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
  const user = {};

  const props = {
    fetchAllDocuments: jest.fn(),
    searchAllDocuments: jest.fn(),
    clearSearch: jest.fn(),
    viewDocument: jest.fn()
  };
  
  const wrapper = shallow(<AllDocumentsPage
    user={user}
    searchAllDocuments={props.searchAllDocuments}
    fetchAllDocuments={props.fetchAllDocuments}
    clearSearch={props.clearSearch}
    manageDocuments={manageDocuments}
    viewDocument={props.viewDocument}
  />);

  return {
    props,
    wrapper,
    manageDocuments
  };
};

describe('AllDocumentsPage components', () => {
  const { wrapper, props } = setup();
  describe('SideBar', () => {
    it('renders html elements', () => {
      expect(wrapper.find('div').length).toBe(2);
      expect(wrapper.find('h1').length).toBe(1);
    });

    // it('should render subcomponent AllDocumentsList', () => {
    //   const AllDocumentsListProps = wrapper.find('AllDocumentsList').props();
    //   // expect(AllDocumentsListProps.viewDocument).toEqual(props.viewDocument);
    // });

  });
});

