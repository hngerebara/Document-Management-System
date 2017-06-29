import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkinUserAction } from './AuthActions';
import { browserHistory, Link } from 'react-router';
import validateInput from '../../../../server/validations/login';

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
      <div className="row">
        <div className="col s10 m6 l3 offset-l5 offset-s1  offset-m3">
          <div className="card z-depth-2">
            <div className="card-header">
              <img src="/client/images/document.jpeg" alt="hopeaz" />
            </div>
            <div className="card-content">
              <form>
                <div className="row">
                  <div className="input-field">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      type="text"
                      className="validate"
                      name="email"
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
                      onChange={this.handleChange}
                      checkUserExists={this.checkUserExists}
                      className="validate"
                      name="password"
                    />
                    <label htmlFor="icon_prefix">Password</label>
                  </div>
                </div>

                <div className="row">
                  <button
                    className="btn waves-effect waves-light col s12"
                    type="submit"
                    onClick={this.handleCheckin}
                  >
                    CHECKIN
                  </button>
                </div>
              </form>
            </div>
            <div className="card-action">
              <span>Not Registered? <Link to="/signup">SIGNUP</Link></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckinPage.propTypes = {
  checkinUserAction: PropTypes.func.isRequired
};

export default connect(null, { checkinUserAction })(CheckinPage);
