import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Please enter your username';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please enter your password';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Please confirm your password';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
