import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
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

describe('components', () => {
  const { wrapper, props } = setup();
  describe('Header', () => {
    it('renders the header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
    });

    it('renders a div', () => {
      expect(wrapper.find('div')).to.have.length(1);
    });

    it('renders a nav', () => {
      expect(wrapper.find('nav')).to.have.length(1);
    });

    it('renders Links', () => {
      expect(wrapper.find('Link')).to.have.length(2);
    });

    it('renders a ul', () => {
      expect(wrapper.find('ul')).to.have.length(2);
    });

    it('renders li', () => {
      expect(wrapper.find('li')).to.have.length(5);
    });

    it('should simulate signOutUser when clicked', () => {
      expect(wrapper.find('.clicks-0').length).to.equal(1);
      const link = wrapper.find({ to: '/' });
      link.simulate('click');
      expect(wrapper.find('.clicks-1').length).to.equal(1);
    });
  });
});

