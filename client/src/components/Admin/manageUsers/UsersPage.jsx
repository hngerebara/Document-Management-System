import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react';
import UsersList from './UsersList';
import SearchBar from '../../common/SearchBar';
import SideBar from '../../common/SideBar';
import { fetchAllUsers, deleteUser } from './UsersActions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

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
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  manageUsers: state.UsersReducer
});

export default connect(mapStateToProps, { fetchAllUsers, deleteUser })(
  UsersPage
);
