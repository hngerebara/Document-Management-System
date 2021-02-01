import React, { PropTypes } from 'react';
import moment from 'moment';


/**
 * @desc displays user in rows.
 * @class UsersListRow
 */
const UsersListRow = ({ user, deleteUser }) => (
  <ul className="collection" id="single-user">
    <li className="collection-item avatar" key={user.id}>
      <i className="material-icons circle">perm_identity</i>
      <p>Name: {user.firstName} {user.lastName} </p>
      <p>Role: {user.Role.title} </p>
      <p>Date Joined: {moment(user.createdAt).format('L')} </p>
      <a className="secondary-content">
        <i className="material-icons circle">perm_identity</i>
      </a>
      {(user.Role.title !== 'Admin') ?
        <a
          className="secondary-content" id="delete-user"
          onClick={(event) => {
            event.preventDefault();
            deleteUser(user.id);
          }}
        >
          <i className="close waves-effect waves-light material-icons">
              delete
            </i>
        </a>
          :
          ''
        }
    </li>
  </ul>
  );

UsersListRow.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};
export default UsersListRow;
