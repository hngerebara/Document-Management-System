import React from 'react';
import { shallow } from 'enzyme';
import { SignupForm } from '../../../../client/src/components/auth/SignupForm';


const mockRouter = jest.fn();

jest.mock('react-router', () => ({
  browserHistory: {
    push(url) {
      mockRouter(url);
    }
  }
}));

const mockSignupUser = jest.fn(() => Promise.resolve({ mockRouter }));

let wrapper;

describe('SignupForm Component', () => {
  wrapper = shallow(<SignupForm
    signupUser={mockSignupUser}
  />);
  describe('SignupPage', () => {
    it('calls signupUser action when signup form is submitted', () => {
      wrapper.setState({
        username: 'Hopeaz',
        firstName: 'Hope',
        lastName: 'Ngerebara',
        email: 'hopez@gmail.com',
        password: 'testing',
        passwordConfirmation: 'testing',
        errors: {},
        isLoading: false,
        invalid: false
      });
      const mockEvent = {
        preventDefault: () => {}
      };

      const saveBtn = wrapper.find('#hopez-save');
      saveBtn.simulate('click', mockEvent);
      expect(mockSignupUser).toHaveBeenCalled();
      expect(mockSignupUser).toHaveBeenCalledWith({
        username: 'Hopeaz',
        firstName: 'Hope',
        lastName: 'Ngerebara',
        email: 'hopez@gmail.com',
        password: 'testing',
        passwordConfirmation: 'testing',
        errors: {},
        isLoading: false,
        invalid: false
      });
    });
  });
});

