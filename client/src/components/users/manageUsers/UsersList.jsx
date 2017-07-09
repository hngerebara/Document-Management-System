import React, { PropTypes } from 'react';
import UsersListRow from './UsersListRow';

/**
 * @desc displays all users Component.
 * @class UsersList
 */
const UsersList = ({ users, deleteUser }) => (
  <div className="row">
    {users.map(user => (
      <UsersListRow
        key={user.id}
        user={user}
        deleteUser={deleteUser}
      />
          ))}
  </div>
  );

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UsersList;