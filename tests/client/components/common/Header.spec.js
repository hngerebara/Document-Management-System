import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Header } from '../../../../client/src/components/common/Header';

const setup = () => {
  const props = {
    signOutUser: jest.fn(),
    Auth: {
      isAuthenticated: true,
      user: {}
    }
  };

  const wrapper = mount(<Header {...props} />);

  return {
    props,
    wrapper
  };
};

describe('Header component', () => {
  const { wrapper } = setup();
  describe('Html components', () => {
    it('renders the header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
    });

    it('renders a div', () => {
      expect(wrapper.find('div')).to.have.length(1);
    });

    it('renders a nav', () => {
      expect(wrapper.find('nav')).to.have.length(1);
    });

    it('renders a ul', () => {
      expect(wrapper.find('ul')).to.have.length(1);
    });

    it('renders li', () => {
      expect(wrapper.find('li')).to.have.length(2);
    });
  });
});

