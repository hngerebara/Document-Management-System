import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import axios from '../../utils/api';
import validateInput from '../../validations/signup';
import toastr from 'toastr';
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


  checkUserExists(event) {
    const field = event.target.name;
    const username = event.target.value;
    if (username) {
      axios.get(`/check-username/${username}`)
      .then((res) => {
        this.setState({
          errors: {
            ...this.state.errors,
            username: '',
          },
        });
      })
      .catch((error) => {
        this.setState({
          errors: {
            ...this.state.errors,
            username: 'Username already exist',
          }
        });
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
          toastr.success('Signed up succesfully');
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
      <form className="col-12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              onBlur={this.checkUserExists}
            />
            <label htmlFor="icon_prefix">username</label>
          {errors.username && <span>{errors.username}</span>}
          </div>

           <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="icon_prefix">Email</label>
          {errors.email && <span>{errors.email}</span>}
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="icon_prefix">FirstName</label>
          {errors.firstName && <span>{errors.firstName}</span>}
          </div>

          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              type="text"
              className="validate"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="icon_prefix">LastName</label>
          {errors.lastName && <span>{errors.lastName}</span>}
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">lock_outline</i>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="validate"
              name="password"
            />
            <label htmlFor="icon_prefix">Password</label>
          {errors.password && <span>{errors.password}</span>}
          </div>

          <div className="input-field col s6">
            <i className="material-icons prefix">lock_outline</i>
            <input
              type="password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              className="validate"
              name="passwordConfirmation"
            />
            <label htmlFor="icon_prefix">Confirm Password</label>
          {errors.passwordConfirmation && <span>{errors.passwordConfirmation}</span>}
          </div>
        </div>

        <div className="row">
          <button
            className="btn waves-effect waves-light col s12"
            type="submit"
            disabled={this.state.isLoading}
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
  signupUser: PropTypes.func.isRequired
};

export default SignupForm;
