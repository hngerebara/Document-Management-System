import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SearchBar } from '../../../../client/src/components/common/SearchBar';

const setup = () => {
  const props = {
    clearSearch: jest.fn(),
    searchFn: jest.fn(),
  };

  const wrapper = mount(<SearchBar {...props} />);
  return {
    props,
    wrapper
  };
};

describe('SearchBar component', () => {
  const { wrapper, props } = setup();
  it('renders a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('It calls clearSearch action when button clicked', () => {
    wrapper.setState({
      isSearching: true
    });
    wrapper.find('#search-btn').simulate('click');
    expect(props.clearSearch).toHaveBeenCalled();
  });

  it('It calls Search Function when the user starts searching', () => {
    const mockEvent = {
      target: { id: 'search-input', value: 'sear' }
    };
    wrapper.setState({
      isSearching: true
    });
    wrapper.find('#search-input').simulate('change', mockEvent);
    expect(props.searchFn).toHaveBeenCalled();
  });
});

