import React, { Component, PropTypes} from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signupUser, isUserExists } from './SignupActions';
import { addFlashMessage } from '../flash/FlashMessageActions';

class SignupPage extends Component {
  render() {
    const { signupUser, addFlashMessage, isUserExists } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            isUserExists={isUserExists}
            signupUser={signupUser}
            addFlashMessage={addFlashMessage}
          />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

export default connect(null, { signupUser, addFlashMessage, isUserExists })(SignupPage);