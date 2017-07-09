import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SideBar } from '../../../../client/src/components/common/SideBar';

const setup = () => {
  const props = {
    signOutUser: jest.fn(),
    Auth: {
      user: {}
    }
  };

  const wrapper = mount(<SideBar {...props} />);
  return {
    props,
    wrapper
  };
};

describe('SideBar components', () => {
  const { wrapper, props } = setup();
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

