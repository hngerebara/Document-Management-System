import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const Header = (props) => {
/**
 * @return {ReactElement} markup
 */
  const { user } = props.Auth;
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
              <a
                className="right dropdown-button"
                data-activates="user_dropdown"
              >
                <i className=" material-icons">account_circle</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  Auth: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, null)(
  Header
);
