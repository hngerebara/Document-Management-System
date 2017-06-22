import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutUser } from '../../components/auth/AuthActions';
// import '../../styles/custom.scss';


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
    const { isAuthenticated } = this.props.Auth;
    const isAdmin = this.props.Auth.user.id === 96;

    const userLinks = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li><Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/documents">Other Documents</Link>
        </li>
        <li>
          <Link to="/documents/new">Create Document</Link>
        </li>
        <li><Link to="/documents/new" />
        </li>
        {isAdmin &&
          <li><Link to="/users">GetUsers</Link>
          </li>
          }
        <li><a href="/" onClick={this.signOut}>Signout</a></li>
      </ul>

    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li><Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/checkin">Checkin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    );


    return (
      <nav>
        <div >
          <div>
            <Link to="/">Hopeaz DMS</Link>
          </div>
          <div>
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
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

export default connect(mapStateToProps, { signOutUser })(Header);
