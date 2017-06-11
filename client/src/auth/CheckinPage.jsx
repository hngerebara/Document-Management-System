import React, { PropTypes, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as AuthActions from "./AuthActions";
import TextInput from '../components/common/TextInput';
import { browserHistory } from 'react-router';

class CheckinPage extends Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { username: "", password: "" }, error: "" };
    this.onChange = this.onChange.bind(this);
    this.onCheckin = this.onCheckin.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }

  onCheckin(event) {
    event.preventDefault();
    this.props.actions.checkinUser(this.state.credentials)
    .then(() => browserHistory.push('/about'))
    .catch(() => this.setState({ error: 'User name or password not correct'}));
  }

  render() {
    return (
      <div>
        { this.state.error &&
          <p>{ this.state.error }</p>
        }
        <form>
          <TextInput
            name="username"
            label="username"
            value={this.state.credentials.username}
            onChange={this.onChange}
          />

          <TextInput
            name="password"
            label="password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />

          <TextInput type="submit" onClick={this.onCheckin} />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(CheckinPage);
