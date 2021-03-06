import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../common/SearchBar';
import SideBar from '../../common/SideBar';
import UsersList from './UsersList';
import Header from '../../common/Header';
import Pagination from '../../common/Pagination';
import {
  fetchAllUsers,
  deleteUser,
  searchAllUsers,
  clearSearch,
} from './UsersActions';

/**
 * @desc UsersPage Component
 * @class UsersPage
 * @extends {Component}
 */
export class UsersPage extends Component {
  /**
   * Creates an instance of UsersPage.
   * @param {object} props property of element
   * @memberof UsersPage
   */
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    };
  }
  /**
   * @desc call fetchAllUsers before component mounts
   * @memberof UsersPage
   * @returns {array} returns all users
   */
  componentDidMount() {
    this.props.fetchAllUsers();
  }

 /**
   * @desc renders Html
   * @returns {*} html
   * @memberof UsersPage
   */
  render() {
    const { manageUsers } = this.props;
    const users = manageUsers.isSearching
      ? manageUsers.searchUsers
      : manageUsers.users;
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <h1>Users</h1>
            <SideBar />
            <SearchBar search={this.props.searchAllUsers} />
            <div>
              <ul>
                <UsersList users={users} deleteUser={this.props.deleteUser} />
              </ul>
            </div>

            {users.length > 0 &&
            <Pagination
              searchQuery={manageUsers.searchQuery}
              fetch={this.props.fetchAllUsers}
              search={this.props.searchAllUsers}
              isSearching={manageUsers.isSearching}
              pagination={manageUsers.pagination}
              searchPagination={manageUsers.searchPagination}
            />
            }

          </div>
        </main>
      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  searchAllUsers: PropTypes.func.isRequired,
  manageUsers: PropTypes.shape({}).isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  manageUsers: state.UsersReducer,
});

export default connect(mapStateToProps, {
  fetchAllUsers,
  deleteUser,
  searchAllUsers,
  clearSearch,
})(UsersPage);
