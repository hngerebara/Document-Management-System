import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkinUserAction } from './AuthActions';
import { browserHistory, Link } from 'react-router';
import validateInput from '../../../../server/validations/login';
import TextInput from '../common/TextInput';

/**
 *
 *
 * @class CheckinPage
 * @extends {Component}
 */
class CheckinPage extends Component {

  /**
   * Creates an instance of CheckinPage.
   * @param {any} props
   *
   * @memberOf CheckinPage
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      success: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf CheckinPage
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf CheckinPage
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return {
      isValid
    };
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf CheckinPage
   */
  handleCheckin(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, success: 'Login success', isLoading: true });
      this.props
        .checkinUserAction(this.state)
        .then(() => browserHistory.push('/documents'))
        .catch(() =>
          this.setState({ error: 'User name or password not correct' })
        );
    }
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf CheckinPage
   */
  render() {
    const { errors, email, password } = this.state;

    return (
      <div className="login-container">
        { this.state.error ?
          <div className="login error">
            { this.state.error }
          </div>
            : <span />
          }

        { this.state.success ?
          <div className="login success">
            { this.state.success }
          </div>
            : <span />
          }
        <div className="card-content">
          <form>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <TextInput
                  name="email"
                  error={errors.email}
                  label="Email"
                  onChange={this.handleChange}
                  checkUserExists={this.checkUserExists}
                  value={email}
                  field="email"
                  className="validate"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">lock_outline</i>
                <TextInput
                  name="password"
                  error={errors.password}
                  label="password"
                  onChange={this.handleChange}
                  checkUserExists={this.checkUserExists}
                  value={password}
                  field="password"
                  className="validate"
                  type="password"
                />
              </div>
            </div>
            <div className="row">
              <button
                className="pink btn waves-effect waves-light col s12"
                type="submit"
                onClick={this.handleCheckin}
              >
                CHECKIN
              </button>
            </div>
          </form>
        </div>
        <div className="card-action">
          <span>Not Registered? <Link to="/users">SIGNUP</Link></span>
        </div>
      </div>
    );
  }
}

CheckinPage.propTypes = {
  checkinUserAction: PropTypes.func.isRequired
};

export default connect(null, { checkinUserAction })(CheckinPage);
