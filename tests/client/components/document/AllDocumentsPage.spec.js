import React from 'react';
import { shallow } from 'enzyme';
import { AllDocumentsPage } from '../../../../client/src/components/document/otherDocuments/AllDocumentsPage';

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
  const props = {
    deleteDocument: jest.fn(),
    fetchAllDocuments: jest.fn(),
    searchAllDocuments: jest.fn(),
    clearSearch: jest.fn()
  };

  const wrapper = shallow(<AllDocumentsPage
    searchAllDocuments={props.searchAllDocuments}
    fetchAllDocuments={props.fetchAllDocuments}
    clearSearch={props.clearSearch}
    deleteDocument={props.deleteDocument}
    manageDocuments={manageDocuments}
  />);

  return {
    props,
    wrapper,
    manageDocuments
  };
};

describe('AllDocumentsPage components', () => {
  const { wrapper, props, manageDocuments } = setup();
  describe('SideBar', () => {
    it('renders html elements', () => {
      expect(wrapper.find('div').length).toBe(2);
      expect(wrapper.find('h1').length).toBe(1);
    });

     it('should render subcomponent AllDocumentsList', () => {
      const AllDocumentsListProps = wrapper.find('AllDocumentsList').props();
      expect(AllDocumentsListProps.deleteDocument).toEqual(props.deleteDocument);
      expect(AllDocumentsListProps.manageDocuments).toEqual(manageDocuments);
    });



  });
});

