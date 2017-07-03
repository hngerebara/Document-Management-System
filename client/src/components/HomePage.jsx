import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { signOutUser } from '../components/auth/AuthActions';

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
      <div className="welcome">
        <div id="wrap">
          <div id="box">
            <div className="col-md-12 text-center pull-middle">
              <p className="flow-text">Welcome to</p>
              <h1 className="title grey-text text-lighten-3">Hopeaz DMS</h1>
              <p className="flow-text">
                  A convienient place to manage your documents
                </p>
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-primary glyphicon glyphicon-lock"
                >
                  <Link to="/signup">
                      Signup
                    </Link>
                </button>
              </span>
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-primary glyphicon glyphicon-lock"
                >
                  <Link to="/checkin">
                      Checkin
                    </Link>
                </button>
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HomePage;
