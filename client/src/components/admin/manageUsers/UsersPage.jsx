import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import SearchBar from '../../common/SearchBar';
import ReactPaginate from 'react-paginate';
import SideBar from '../../common/SideBar';
import { fetchAllUsers, deleteUser, searchAllUsers } from './UsersActions';

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
      currentUser: {},
    }
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
    (this.props.manageUsers.sSearching ?
    this.props.searchAllUsers() :
    this.props.fetchAllUsers());
  }


handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 3);
    this.props.fetchAllUsers(offset);
  }

  searchClick = (data) => {
    const selected = data.selected;
    const search = this.props.manageUsers.searchQuery;
    const offset = Math.ceil(selected * 3);
    this.props.searchAllUsers(search, offset);
  }

  viewUser = (userId) => {
    const { manageUsers } = this.props;
    const users = manageUsers.isSearching ? manageUsers.searchUsers :
      manageUsers.users
    const user = users.find(user => user.id === userId);
    if (user) {
      this.setState({ currentUser: user });
      $('.doc-modal').modal('open');
    }
  }

  /**
   *
   * @returns [array]
   *
   * @memberOf UsersPage
   */
  render() {
    const { manageUsers } = this.props;
    console.log(manageUsers, 'fhgsdghffhjsjfhg');
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
                    users={manageUsers.isSearching ?
                    manageUsers.searchUsers :
                    manageUsers.users}
                    viewDocument={this.viewDocument}
                    searchAllUsers={this.props.searchAllUsers}
                  />
                ))}
              </ul>
            </div>
          </div>
        </main>
        <div className="userspagination">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={manageUsers.isSearching ?
            manageUsers.searchPagination.page_count :
            manageUsers.pagination.page_count}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={manageUsers.isSearching ?
            this.searchClick : this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />

           <ViewUser document={this.state.currentUser} />
        </div>
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

export default connect(mapStateToProps, { fetchAllUsers, deleteUser })(
  UsersPage
);
