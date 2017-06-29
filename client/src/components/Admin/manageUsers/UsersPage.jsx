import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import SearchBar from '../../common/SearchBar';
import SideBar from '../../common/SideBar';
import { fetchAllUsers, deleteUser } from './UsersActions';

/**
 *
 *
 * @class UsersPage
 * @extends {Component}
 */
class UsersPage extends Component {
  /**
   * call fetchAllUsers
   * before component mounts
   *
   * @memberOf UsersPage
   */
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  /**
   *
   * @returns [array]
   *
   * @memberOf UsersPage
   */
  render() {
    const { manageUsers } = this.props;
    return (
      <div>
        <main>
          <div className="container">
            <h1>Users</h1>
            <SearchBar />
            <SideBar />
            <div>
              <ul>
                {manageUsers.users.map((user, index) => (
                  <UsersList
                    key={index}
                    user={user}
                    deleteUser={this.props.deleteUser}
                  />
                ))}
              </ul>
            </div>

          </div>
        </main>
      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  manageUsers: PropTypes.object,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageUsers: state.UsersReducer
});

export default connect(mapStateToProps, { fetchAllUsers, deleteUser })(
  UsersPage
);
