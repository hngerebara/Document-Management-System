import React, { Component, PropTypes } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signupUser } from './SignupActions';


/**
 * @desc SignupPage Component
 * @class SignupPage
 * @extends {Component}
 */
class SignupPage extends Component {
  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof SignupPage
   */
  render() {
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
              <SignupForm
                signupUser={this.props.signupUser}
              />
            </div>
            <div className="card-action">
              <span>Already Registered? <Link to="/checkin">CHECKIN</Link></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired
};

export default connect(null, { signupUser })(
  SignupPage
);
