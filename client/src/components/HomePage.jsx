import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { signOutUser } from '../components/auth/AuthActions'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.signOutUser();
    browserHistory.push('/');
  }
  render() {
    return (
      <div>
        <span>
    Hello world! This is the home page route.
  </span>
      </div>
    );
  }

}

export default muiThemeable()(HomePage);
