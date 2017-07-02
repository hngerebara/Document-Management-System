import React, { Component, PropTypes } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { signupUser } from './SignupActions';

class SignupPage extends Component {
  render() {
    const { signupUser} = this.props;
    return (
      <div className="row">
        <div className="col s10 m6 l3 offset-l5 offset-s1  offset-m3">
          <div className="card z-depth-2">
            <div className="card-header">
              <img src="/client/images/document.jpeg" alt="hopeaz" />
            </div>
            <div className="card-content">
              <SignupForm
                signupUser={signupUser}
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
