import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Footer from '../../../../client/src/components/common/Footer';

const wrapper = mount(<Footer />);

describe('footer component', () => {
  it('renders properly', () => {
    expect(wrapper.find(Footer)).to.have.length(1);
  });

  it('should have 2 div tags', () => {
    expect(wrapper.find('div')).to.have.length(2);
  });
});
