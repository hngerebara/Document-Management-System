import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm.jsx';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../../actions/SignupAction.js';

class SignupPage extends React.Component {
  render() {
      const { userSignupRequest }  = this.props;
    return (
        <div>
          <SignupForm userSignupRequest={this.userSignupRequest} />
        </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);