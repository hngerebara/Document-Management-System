import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * @desc HomePage Component
 * @class HomePage
 * @extends {Component}
 */
class HomePage extends Component {
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

export default HomePage;
