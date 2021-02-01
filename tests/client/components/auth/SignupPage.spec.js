import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../../../client/src/components/auth/SignupPage';

const signupUser = jest.fn();

let wrapper;

describe('SignupPage Component', () => {
  wrapper = shallow(<SignupPage signupUser={signupUser} />);
  describe('SignupPage', () => {
    it('renders the SignupPage component', () => {
      expect(wrapper.find('div').length).toEqual(6);
    });

    it('should render subcomponent SignupForm', () => {
      const SignupFormProps = wrapper.find('SignupForm').props();
      expect(SignupFormProps.signupUser).toEqual(signupUser);
    });
  });
});

