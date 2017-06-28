import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signOutUser } from '../../components/auth/AuthActions';
import jwtDecode from 'jwt-decode';

class SideBar extends Component {
  constructor(props) {
    super(props);
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.Auth;
    const isAdmin = this.props.Auth.user.title === 'Admin';

    return (
      <div className="sidebar">

        <ul id="slide-out" className="side-nav fixed">
          <Link className="page-title">HopeazDMS</Link>
          <li><Link to="/documents/new">
            <i className="mdi-action-dashboard left" />Create Document</Link></li>
          <li><Link to="/documents">
            <i className="mdi-action-dashboard left" />Other Documents</Link></li>
          <li><Link to={`/users/${this.props.Auth.user.id}/documents`}>
            <i className="mdi-action-dashboard left" />My Documents</Link></li>
          {isAdmin &&
          <div>
            <li><Link to="/users">
              <i className="mdi-social-people left" />Users</Link></li>
            <li><Link to="/roles">
              <i className="mdi-social-people left" />Roles</Link></li>
          </div>}
          <li><Link to="/" onClick={this.signOut}>
            <i className="mdi-action-dashboard left" />Signout</Link></li>
        </ul>
      </div>
    );
  }
}
SideBar.propTypes = {
  Auth: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { Auth: state.Auth };
}

export default connect(mapStateToProps, { signOutUser })(
  SideBar
);
