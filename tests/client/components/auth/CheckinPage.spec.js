import React from 'react';
import { browserHistory } from 'react-router';
import { mount, shallow } from 'enzyme';
import { CheckinPage } from '../../../../client/src/components/auth/CheckinPage';


const mockRouter = jest.fn();

jest.mock('react-router', () => ({
  browserHistory: {
    push(url) {
      mockRouter(url);
    }
  }
}));

const mockCheckinUserAction = jest.fn(() => Promise.resolve({ mockRouter }));

let wrapper;

describe('Userpage Component', () => {
  wrapper = shallow(<CheckinPage
    checkinUserAction={mockCheckinUserAction}
  />);
  describe('UsersPage', () => {
    it('renders the UsersPage component', () => {
      expect(wrapper.find('div').length).toEqual(11);
    });

    it('calls checkinUserAction action when login form is submitted', () => {
      wrapper.setState({
        email: 'hopez@gmail.com',
        password: 'testing',
        success: '',
        errors: {},
        isLoading: false
      });
      const mockEvent = {
        preventDefault: () => {}
      };

      const saveBtn = wrapper.find('#hopez-save');
      saveBtn.simulate('click', mockEvent);
      expect(mockCheckinUserAction).toHaveBeenCalled();
      expect(mockCheckinUserAction).toHaveBeenCalledWith({
        email: 'hopez@gmail.com',
        password: 'testing',
        success: '',
        errors: {},
        isLoading: false
      });
    });

    it('sets state on input field change', () => {
      const mockEvent = {
        target: { name: 'email', value: 'hopez@gmail.com' }
      };
      const Input = wrapper.find('#email');
      Input.simulate('change', mockEvent);

      expect(wrapper.state('email')).toEqual(mockEvent.target.value);
    });
  });
});

