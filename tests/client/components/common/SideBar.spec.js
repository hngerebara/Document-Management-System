import React from 'react';
import { shallow } from 'enzyme';
import { SideBar } from '../../../../client/src/components/common/SideBar';

  const props = {
    signOutUser: jest.fn(),
    Auth: {
      user: {
        id: 2,
        username: 'blessed'
      }
    }
  };

  const wrapper = shallow(<SideBar {...props} />);

describe('SideBar components', () => {
  describe('SideBar', () => {
    it('renders a div', () => {
      expect(wrapper.find('div').length).toEqual(3);
    });

    it('renders a ul', () => {
      expect(wrapper.find('ul').length).toEqual(2);
    });
    it('renders a li', () => {
      expect(wrapper.find('li').length).toEqual(6);
    });
    it('renders a link', () => {
      expect(wrapper.find('Link').length).toEqual(5);
    });

    it('It calls signOutUser action when button clicked', () => {
      const mockEvent = {
        preventDefault: () => {}
      };
      wrapper.find('#signout').simulate('click', mockEvent);
      expect(props.signOutUser).toHaveBeenCalled();
    });
  });
});

