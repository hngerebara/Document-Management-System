import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import UsersListRow from '../../../../client/src/components/users/manageUsers/UsersListRow';

const user = {
    id: 3,
    firstName: 'Hope',
    lastName: 'Ngere',
    Role: {
      title: 'Staff'
    }
  } 

const props = {
 mockDeleteUser: jest.fn(),
};


const wrapper = shallow(<UsersListRow
  deleteUser={props.mockDeleteUser}
  user={user}
/>);


describe('UsersListRow Component', () => {
  describe('UsersListRow', () => {
    it('renders a ul', () => {
      expect(wrapper.find('ul').length).toEqual(1);
    });

    it('renders a li', () => {
      expect(wrapper.find('li').length).toEqual(1);
    });
    it('renders a p', () => {
      expect(wrapper.find('p').length).toEqual(3);
    });
  });
});

