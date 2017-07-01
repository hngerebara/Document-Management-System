import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

const ViewUser = ({ user }) => (
   <div id="modal2" className="user-modal modal modal-fixed-footer">
    <div className="modal-content">
      <h2> User Details</h2>
      <h4>{user.firstName} {user.lastName}</h4>
      <hr />
      <p>Date Joined: {moment(user.createdAt).format('L')}</p>
      <p> Number of Documents created: {user.documents}</p>

      <p>Role: {user.Role}</p>
    </div>
    <div className="modal-footer">
      <Link
            to={`/editUser/${user.id}`}
            className="modal-action waves-effect waves-light btn modal-close"
          > <i className="material-icons left">mode_edit</i>
          Edit User</Link>
      <a
        href="#!"
        className="modal-action modal-close waves-effect waves-green btn-flat"
      >
        Close
      </a>
    </div>
  </div>

  
);

ViewUser.propTypes = {
  user: PropTypes.object.isRequired
};

export default ViewUser;
