import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please checkin with a valid email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Enter your password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
