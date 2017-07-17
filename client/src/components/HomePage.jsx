import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { signOutUser } from '../components/auth/AuthActions';

/**
 * @desc HomePage Component
 * @class HomePage
 * @extends {Component}
 */
class HomePage extends Component {
  /**
   * Creates an instance of HomePage.
   * @param {object} props property of element
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

   /**
   * @desc handles user logout
   * @returns {null} returns no value
   * @memberof HomePage
   */
  handleLogout() {
    this.props.signOutUser();
    browserHistory.push('/');
  }

  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof HomePage
   */
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

HomePage.propTypes = {
  signOutUser: PropTypes.func.isRequired
};

export default HomePage;
