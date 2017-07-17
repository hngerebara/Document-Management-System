import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import UserDocumentListRow from '../../../../client/src/components/document/userDocuments/UserDocumentListRow';

const setup = () => {
  const user = {
    id: 2,
    email: 'hopez@ymail.com',
    firstName: 'Hope',
    lastName: 'HopezLastName',
    password: '12345',
  };

  const props = {
    mockDeleteDocument: jest.fn(),
    mockViewDocument: sinon.spy(),
    document: {
      creatorId: 2,
      id: 1
    }
  };
  UserDocumentListRow.prototype.viewDocument = sinon.spy();

  const wrapper = shallow(
    <UserDocumentListRow
      document={props.document}
      user={user}
      deleteDocument={props.mockDeleteDocument}
      viewDocument={props.mockViewDocument}
      params={props.params}
    />);

  return {
    props,
    wrapper,
    user
  };
};

describe('UserDocumentListRow components', () => {
  const { wrapper, props } = setup();
  describe('SideBar', () => {
    it('renders html elements', () => {
      expect(wrapper.find('div').length).toBe(6);
      expect(wrapper.find('span').length).toBe(3);
    });
    it('simulates button click for view document', () => {
      wrapper.find('#view-link').simulate('click');
      expect(props.mockViewDocument.calledOnce).toEqual(true);
    });
  });
});

