import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signOutUser } from '../../components/auth/AuthActions';

/**
 * @desc SideBar Component
 * @class SideBar
 * @extends {Component}
 */
export class SideBar extends Component {
  /**
 * Creates an instance of SideBar.
 * @param {object} props property of element
 * @memberof SideBar
 */
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

/** handles user signout
 * @param {SytheticEvent} event
 * @returns {null} returns no value
 * @memberof SideBar
 */
  signOut(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  /**
 * @desc renders Html
 * @returns {*} html
 * @memberof SideBar
 */
  render() {
    const { user } = this.props.Auth;
    const isAdmin = this.props.Auth.user.id === 1;

    return (
      <div className="sidebar">
        <ul id="slide-out" className="side-nav fixed">
          <li className="center">
            <div className="indigo lighten-2 white-text">
              <div className="row">
                <img
                  src="https://res.cloudinary.com/dwrl3tf6j/image/upload/v1499075232/hopeazdms_logo_d3cirn.png"
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
              <Link
                to="/documents/new"
                id="createdocument"
              >
                <i className="waves-effect material-icons side-nav-link-av">note_add</i>
                Create Document
              </Link>
            </li>
            <li>
              <Link to="/documents">
                <i className="waves-effect material-icons side-nav-link-av">folder</i>
                Other Documents
              </Link>
            </li>
            <li>
              <Link to={`/users/${this.props.Auth.user.id}/documents`} id="user-document">
                <i className="waves-effect material-icons side-nav-link-av">shop_two</i>
                My Documents
              </Link>
            </li>
            <li>
              <Link to={`/users/${this.props.Auth.user.id}`} id="edit-profile">
                <i className="waves-effect material-icons side-nav-link-av" id="edite-profile">edit_mode</i>
                Edit Profile
              </Link>
            </li>

            {isAdmin &&
              <div>
                <li>
                  <Link to="/users" id="view-users">
                    <i className="waves-effect material-icons side-nav-link-av">people</i>
                    Users
                  </Link>
                </li>
              </div>}
            <li>
              <Link to="/" id="signout" onClick={this.signOut}>
                <i className="waves-effect material-icons side-nav-link-av">exit_to_app</i>
                Signout
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
