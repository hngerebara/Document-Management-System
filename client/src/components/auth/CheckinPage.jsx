import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkinUserAction } from './AuthActions';
import { browserHistory } from 'react-router';
import validateInput from '../../../../server/validations/login';
import TextInput from '../common/TextInput';


class CheckinPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errors: {}, isLoading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.checkinUserAction(this.state)
      .then(() => browserHistory.push('/documents'))
      .catch(() => this.setState({ error: 'User name or password not correct' }));
    }
  }

  render() {
    const { errors, email, password, isLoading } = this.state;

    return (
      <form onSubmit={this.handleCheckin}>
        <h1>Login</h1>
        { this.state.error &&
        <p>{ this.state.error }</p>
        }

        <TextInput
          name="email"
          field="email"
          type="text"
          label="Email"
          placeholder="Email"
          value={email}
          error={errors.email}
          onChange={this.handleChange}
        />

        <TextInput
          name="password"
          field="Password"
          type="password"
          label="Password"
          placeholder="********"
          value={password}
          error={errors.password}
          onChange={this.handleChange}
        />
        <div>
          <button
            disabled={isLoading}
          >
              Login
            </button>
        </div>
      </form>
    );
  }
  }


CheckinPage.propTypes = {
  checkinUserAction: PropTypes.func.isRequired
};

export default connect(null, { checkinUserAction })(CheckinPage);
