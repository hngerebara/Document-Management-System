import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import { fetchAllUsers, deleteUser } from './UsersActions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Users</h1>
        <div>
          <ul>
            {
            users.map((user, index) =>
              <UsersList
                key={index}
                user={user}
                deleteUser={this.props.deleteUser}
              />
            )
          }
          </ul>
        </div>
      </div>
    );
  }
}


UsersPage.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.UsersReducer
});


export default connect(mapStateToProps, { fetchAllUsers, deleteUser })(UsersPage);
