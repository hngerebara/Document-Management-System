import React from 'react';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import UsersListRow from '../../../../client/src/components/admin/manageUsers/UsersListRow';

const setup = () => {
  const props = {
    deleteUser: jest.fn(),
    users: {
      id: 1
    }
  };

  const wrapper = shallow(<UsersListRow
    deleteUser={props.deleteUser}
  />);

  return {
    props,
    wrapper
  };
};

describe('UsersListRow Component', () => {
  const { wrapper, props } = setup();
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

    it('It calls deleteUser action when delete button is clicked', () => {
      wrapper.find('delete').simulate('click');
      expect(props.deleteUser(user.id)).toHaveBeenCalled();
    });
  });
});

