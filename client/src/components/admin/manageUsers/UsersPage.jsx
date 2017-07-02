import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import SearchBar from "../../common/SearchBar";
import SideBar from "../../common/SideBar";
import ViewUser from './ViewUser';
import UsersList from "./UsersList";

import {
  fetchAllUsers,
  deleteUser,
  searchAllUsers,
  clearSearch
} from "./UsersActions";

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
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }
  /**
   * call fetchAllUsers
   * before component mounts
   *
   * @memberOf UsersPage
   */

  componentDidMount() {
    this.props.manageUsers.isSearching
      ? this.props.searchAllUsers()
      : this.props.fetchAllUsers();
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 3);
    this.props.fetchAllUsers(offset);
  }

  searchClick = data => {
    const selected = data.selected;
    const search = this.props.manageUsers.searchQuery;
    const offset = Math.ceil(selected * 3);
    this.props.searchAllUsers(search, offset);
  };

  viewUser = userId => {
    const { manageUsers } = this.props;
    const users = manageUsers.isSearching
      ? manageUsers.searchUsers
      : manageUsers.users;
    const user = users.find(user => user.id === userId);
    if (user) {
      this.setState({ currentUser: user });
      $(".user-modal").modal("open");
    }
  };

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
            <SideBar />
            <SearchBar />

            <div>
              <ul>
                {manageUsers.users.map((user =>
                  <UsersList
                    key={user.id}
                    user={user}
                    deleteUser={this.props.deleteUser}
                    users={
                      manageUsers.isSearching
                        ? manageUsers.searchUsers
                        : manageUsers.users
                    }
                    searchAllUsers={searchAllUsers}
                    viewUser={this.viewUser}
                  />
                ))}
                <ViewUser user={this.state.currentUser} />
              </ul>
            </div>
            <div className="userspagination">
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={
                  manageUsers.isSearching
                    ? manageUsers.searchPagination.page_count
                    : manageUsers.pagination
                }
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={
                  manageUsers.isSearching
                    ? this.searchClick
                    : this.handlePageClick
                }
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />

            </div>
          </div>
        </main>

      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  searchAllUsers: PropTypes.func.isRequired,
  manageUsers: PropTypes.object,
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
