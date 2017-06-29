import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import validateInput from '../../../../server/validations/signup';

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
      this.props
        .signupUser(this.state)
        .then(() => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          browserHistory.push('/documents');
        })
        .catch(() =>
          this.setState({
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
        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
            />
            <label htmlFor="icon_prefix">username</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
            />
            <label htmlFor="icon_prefix">FirstName</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
            />
            <label htmlFor="icon_prefix">LastName</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
            />
            <label htmlFor="icon_prefix">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">lock_outline</i>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
              className="validate"
              name="password"
            />
            <label htmlFor="icon_prefix">Password</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <i className="material-icons prefix">lock_outline</i>
            <input
              type="password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              checkUserExists={this.checkUserExists}
              className="validate"
              name="passwordConfirmation"
            />
            <label htmlFor="icon_prefix">Confirm Password</label>
          </div>
        </div>

        <div className="row">
          <button
            className="btn waves-effect waves-light col s12"
            type="submit"
            onClick={this.handleSubmit}
          >
            SIGN UP
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
