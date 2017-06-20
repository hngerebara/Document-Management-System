import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import * as actions from './UsersActions';

class GetUsers extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  componentDidMount() {
    this.props.actions.fetchAllUsers();
  }

  render() {
    const { users } = this.props;
    console.log(typeof(users))
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
                deleteUser={this.props.actions.deleteUser}
              />
            )
          }
          </ul>
        </div>
      </div>
    );
  }
}


GetUsers.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.UsersReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GetUsers);
