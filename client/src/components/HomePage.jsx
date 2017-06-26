import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { signOutUser } from '../components/auth/AuthActions'

class HomePage extends Component {
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

export default HomePage;
