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
    event.preventDefault()
    console.log(this.state)
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .checkinUserAction(this.state)
        .then(() => browserHistory.push('/documents'))
        .catch(() =>
          this.setState({ error: 'User name or password not correct' })
        );
    }
  }

  render() {
    const { errors, email, password, isLoading } = this.state;

    return (
      <div className="login-container">
        <div className="row">
                {this.state.error && <p>{this.state.error}</p>}
              </div>
              <div className="card-content">
                <form>
                  <div className="row">
                    <div className="input-field">
                      <i className="material-icons prefix">account_circle</i>
                      <TextInput
                        name="email"
                        error={errors.username}
                        label="Email"
                        onChange={this.handleChange}
                        checkUserExists={this.checkUserExists}
                        value={this.state.username}
                        field="email"
                        className="validate"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field">
                      <i className="material-icons prefix">lock_outline</i>
                      <TextInput
                        name="password"
                        error={errors.password}
                        label="password"
                        onChange={this.handleChange}
                        checkUserExists={this.checkUserExists}
                        value={this.state.password}
                        field="password"
                        className="validate"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className="pink btn waves-effect waves-light col s12"
                      type="submit"
                      onClick={this.handleCheckin}
                    >
                      CHECKIN
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-action">
                <a href="/">SIGNUP</a>
              </div>
            </div>
    );
  }
}

CheckinPage.propTypes = {
  checkinUserAction: PropTypes.func.isRequired
};

export default connect(null, { checkinUserAction })(CheckinPage);
