import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import * as actions from './UsersActions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchAllUsers();
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


UsersPage.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.UsersReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
