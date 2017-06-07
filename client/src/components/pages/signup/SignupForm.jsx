import React from 'react';
import PropTypes from 'prop-types';


class SignupForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={this.onChange} />
        </div>
        <div>
          <label>Firstname</label>
          <input type="text" name="firstname" onChange={this.onChange} />
        </div>
        <div>
          <label>Lastame</label>
          <input type="text" name="lastame" onChange={this.onChange} />
        </div>
        <div>
          <label>email</label>
          <input type="text" name="email" onChange={this.onChange} />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" onChange={this.onChange} />
        </div>
        <div>
          <button>Signup</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default SignupForm;
