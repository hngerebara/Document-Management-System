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
  clearSearch
} from './UsersActions';

/**
 *
 *
 * @class UsersPage
 * @extends {Component}
 */

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }
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
            <SearchBar searchFn={this.props.searchAllUsers} />
            <div>
              <ul>
                <UsersList
                  users={users}
                  deleteUser={this.props.deleteUser}
                />
              </ul>
            </div>
            
              <Pagination
                searchQuery={manageUsers.searchQuery}
                fetchFn={this.props.fetchAllUsers}
                searchFn={this.props.searchAllUsers}
                isSearching={manageUsers.isSearching}
                pagination={manageUsers.pagination}
                searchPagination={manageUsers.searchPagination}
              />
           
          </div>
        </main>
      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  searchAllUsers: PropTypes.func.isRequired,
  manageUsers: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageUsers: state.UsersReducer
});

export default connect(mapStateToProps, {
  fetchAllUsers,
  deleteUser,
  searchAllUsers,
  clearSearch
})(UsersPage);
