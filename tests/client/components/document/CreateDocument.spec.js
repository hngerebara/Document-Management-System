import React from 'react';
import { shallow } from 'enzyme';
import { CreateDocumentPage } from '../../../../client/src/components/document/CreateDocumentPage';
import axios from '../../../../client/src/utils/api';

let wrapper;

// const mockFetchDocuments = jest.fn();
// const mockCreateDocument = jest.fn();
// const mockUpdateDocument = jest.fn();

describe('<CreateDocumtPage />', () => {
  const wrapper = shallow(<CreateDocumentPage />);

  it('renders html elements', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('main').length).toBe(1);
  });
});
