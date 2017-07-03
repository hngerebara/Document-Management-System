import React, { Component, PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { checkinUserAction } from './AuthActions';
import { browserHistory, Link } from 'react-router';
import validateInput from '../../validations/login';

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
    // const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors: 'Wrong input' });
    }
    // return {
    //   isValid
    // };
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
      this.setState({ errors: 'Wrong input', isLoading: true });
      this.props.checkinUserAction(this.state)
        .then(() => {
          browserHistory.push('/documents');
          toastr.success('Checked in succesfully');
        })
        .catch(() =>
          this.setState({
            errors: 'User name or password not correct',
            isLoading: false })
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
        <div className="col s12 m6 l3 offset-l3 offset-s1">
          <div className="auth-card z-depth-2">
            <div className="card-header">
              <img
                src="https://res.cloudinary.com/dwrl3tf6j/image/upload/v1499075232/hopeazdms_logo_d3cirn.png"
                alt="hopez" className="circle responsive-img"
                />
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
                      value={email}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="icon_prefix">Email</label>
                  </div>
                  {errors.email && <span>{errors.email}</span>}
                </div>
                <div className="row">
                  <div className="input-field">
                    <i className="material-icons prefix">lock_outline</i>
                    <input
                      type="password"
                      onChange={this.handleChange}
                      className="validate"
                      name="password"
                      value={password}
                    />
                    <label htmlFor="icon_prefix">Password</label>
                  </div>
                  {errors.password && <span>{errors.password}</span>}
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
