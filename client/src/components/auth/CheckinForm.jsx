import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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

class CheckinForm extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' }, error: {}, isLoading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }


  handleCheckin(event) {
    event.preventDefault();
    this.props.actions.checkinUserAction(this.state.credentials)
    .then(() => browserHistory.push('/documents'))
    .catch(() => this.setState({ error: 'User name or password not correct' }));
  }

  render() {
    return (
      <div>
        { this.state.error &&
          <p>{ this.state.error }</p>
        }
        <form>
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
            label="Check-in"
            primary
            style={styles}
            onClick={this.handleCheckin}
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});


export default connect(null, mapDispatchToProps)(muiThemeable()(CheckinForm));
