import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import validateInput from '../../../../server/validations/signup';
import TextInput from '../common/TextInput';

/**
 *
 *
 * @class SignupForm
 * @extends {Component}
 */
class SignupForm extends Component {


  /**
   * Creates an instance of SignupForm.
   * @param {any} props
   *
   * @memberOf SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }


  /**
   * @param {any} event
   *
   * @memberOf SignupForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @returns
   *
   * @memberOf SignupForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @param {any} event
   *
   * @memberOf SignupForm
   */
  checkUserExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      this.props.isUserExists(value).then((res) => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = `User Exists with this${field}`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  /**
   * @param {any} event
   *
   * @memberOf SignupForm
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.signupUser(this.state)
      .then(() => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome!'
        });
        browserHistory.push('/documents');
      }
    ).catch(() => this.setState({
      errors: 'Please check signup details',
      isLoading: false
    })
    );
    }
  }


  /**
   * @returns
   *
   * @memberOf SignupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <form>
        <h1>Join us today!</h1>

        <TextInput
          name="username"
          error={errors.username}
          label="Username"
          onChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextInput
          name="firstName"
          error={errors.firstName}
          label="Firstname"
          onChange={this.handleChange}
          value={this.state.firstName}
          field="firstname"
        />

        <TextInput
          name="lastName"
          error={errors.lastName}
          label="Lastname"
          onChange={this.handleChange}
          value={this.state.lastNname}
          field="lastname"
        />

        <TextInput
          name="email"
          error={errors.email}
          label="Email"
          onChange={this.handleChange}
          value={this.state.email}
          field="email"
        />

        <TextInput
          name="password"
          error={errors.password}
          label="Password"
          onChange={this.handleChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextInput
          name="passwordConfirmation"
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.handleChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button
            className="pink btn waves-effect waves-light col s12"
            disabled={this.state.isLoading || this.state.invalid}
            type="submit"
            onClick={this.handleSubmit}
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default SignupForm;
