import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutUser } from '../../components/auth/AuthActions';
import { searchAllDocuments } from '../../components/document/DocumentActions';

class Header extends React.Component {
  constructor(props) {
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.Auth;
    
    return (
    // const isAdmin = this.props.Auth.user.title === 'Admin';
    <header>
  <nav id="main-nav" className="blue-grey">
    <div className="container">
      <ul className="right">
       <li>Hello {user.username}</li>
        <li><a className="dropdown-button" href="#!" data-activates="user-dropdown">
        <i className="mdi-social-person"></i>
        <i className="mdi-navigation-arrow-drop-down right"></i></a></li>
      </ul>
    </div>
    <ul id="user-dropdown" className="dropdown-content">
      <li><Link to="/accountProfile">My Profile</Link></li>
      <li><Link to="/">Change Password</Link></li>
      <li className="divider"></li>
      <li><Link to="/" onClick={this.signOut}>Signout</Link></li>
    </ul>
  </nav>
  </header>
  
   
    );
  }
}

Header.propTypes = {
  Auth: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { Auth: state.Auth };
}

export default connect(mapStateToProps, { signOutUser, searchAllDocuments })(
  Header
);
