import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signOutUser } from '../../components/auth/AuthActions';

export class Header extends React.Component {

  constructor(props) {
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  render() {
    const { user } = this.props.Auth;
    return (
      <header>
        <nav id="main-nav" className="indigo lighten-2" role="navigation">
          <div className="container">
            <a
              href="#" data-activates="slide-out"
              className="button-collapse"
            ><i className="mdi-navigation-menu">Hopeaz DMS</i></a>
            <ul className="right hide-on-med-and-down">
              <li>Hello {user.username}</li>
              <li>
                <a className="right dropdown-button" data-activates="user_dropdown">
                  <i className=" material-icons">account_circle</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="dropdown-content" id="user_dropdown">
          <li>
            <Link to="/accountProfile" className="indigo-text">
            My Profile
            </Link>
          </li>
          <li className="divider" />
          <li>
            <Link
              to="/"
              onClick={this.signOut}
              className="indigo-text"
              id="signout"
            >
              Signout
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  Auth: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth
  };
};

export default connect(mapStateToProps, { signOutUser })(
  Header
);
