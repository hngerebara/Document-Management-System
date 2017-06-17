import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './AuthActions';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};


class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '' },
      errors: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    const credentials = {
      ...this.state.credentials,
      [field]: value
    };
    return this.setState({ credentials });
  }


  handleSignup(event) {
    event.preventDefault();
    this.props.actions.signupUser(this.state.credentials)
    .then(() => browserHistory.push('/checkin'))
    .catch(() => this.setState({ error: 'Please check signup details.' }));
  }

  render() {
    return (
      <div>
        { this.state.error &&
          <p>{ this.state.error }</p>
        }
        <form>
          <TextField
            hintText="Username Field"
            floatingLabelText="Username"
            name="username"
            label="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          /><br />

          <TextField
            hintText="Firstname Field"
            floatingLabelText="Firstname"
            name="firstName"
            label="firstName"
            value={this.state.credentials.firstName}
            onChange={this.handleChange}
          /><br />

          <TextField
            hintText="Lastname Field"
            floatingLabelText="Lastname"
            name="lastName"
            label="lastName"
            value={this.state.credentials.lastName}
            onChange={this.handleChange}
          /><br />

          <TextField
            hintText="Email Field"
            floatingLabelText="Email"
            name="email"
            label="email"
            value={this.state.credentials.email}
            onChange={this.handleChange}
          /><br />

          <TextField
            hintText="Password Field"
            floatingLabelText="Password"
            name="password"
            label="password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          /><br />
          <RaisedButton
            label="Register"
            primary
            style={styles}
            onClick={this.handleSignup}
          />
        </form>
      </div>
    );
  }
}

// SignupPage.PropTypes = {
//   signupUser : PropTypes.func.isRequired
// }
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(muiThemeable()(SignupPage));
