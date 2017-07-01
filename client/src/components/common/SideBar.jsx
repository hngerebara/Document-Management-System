import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signOutUser } from '../../components/auth/AuthActions';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  render() {
    const { user } = this.props.Auth;
    const isAdmin = this.props.Auth.user.id === 1;

    return (
      <div className="sidebar">
        <ul id="slide-out" className="side-nav fixed">
          <li className="center">
            <div className="indigo darken-2 white-text">
              <div className="row">
                <img
                  src="/client/images/hopeazdms_logo.png"
                  className="circle responsive-img"
                />
                <p>
                  {user.username}
                </p>
              </div>
            </div>
          </li>
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <Link to="/documents/new">
                <i className="waves-effect" />
                Create Document
              </Link>
            </li>
            <li>
              <Link to="/documents">
                <i className="waves-effect" />
                Other Documents
              </Link>
            </li>
            <li>
              <Link to={`/users/${this.props.Auth.user.id}/documents`}>
                <i className="waves-effect" />
                My Documents
              </Link>
            </li>

            {isAdmin &&
              <div>
                <li id="dash_users" className="waves-effect">
                  <Link to="/users">
                    <i className="mdi-social-people left" />Users
                  </Link>
                </li>
                <li>
                  <Link to="/roles">
                    <i className="mdi-social-people left" />Roles
                  </Link>
                </li>
              </div>}
            <li>
              <Link to="/" onClick={this.signOut}>
                <i className="mdi-action-dashboard left" />Signout
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}
SideBar.propTypes = {
  Auth: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  Auth: state.Auth
});

export default connect(mapStateToProps, { signOutUser })(SideBar);