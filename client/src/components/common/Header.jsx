import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

/**
 * @desc Header Component
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
/**
 * Creates an instance of Header.
 * @param {object} props property of element
 * @memberof Header
 */
  constructor(props) {
    super();
  }

/**
 * render
 * @return {ReactElement} markup
 */
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
      </header>
    );
  }
}

Header.propTypes = {
  Auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth
  };
};

export default connect(mapStateToProps, null)(
  Header
);
