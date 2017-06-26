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
      <div className="homepage-body">
        <div id="wrap">
            <div id="box">
              <div>
                <h1>HOPEAZ DMS</h1>
                <div className="col-md-12 text-center pull-middle">
                  <span className="input-group-btn">
                          <button type="submit" 
                          className="btn btn-primary glyphicon glyphicon-lock">
                          <Link to="/users">
                            Signup
                            </Link>
                          </button>
                        </span>
                         <span className="input-group-btn">
                          <button type="submit" 
                          className="btn btn-primary glyphicon glyphicon-lock">
                          <Link to="/checkin">
                            Checkin
                            </Link>
                          </button>
                        </span>
                </div>
              </div>
            </div>
          
        </div>
        
      </div>
    );
  }
}

export default HomePage;
