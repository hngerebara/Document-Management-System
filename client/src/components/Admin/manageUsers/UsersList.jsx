import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const UsersList = ({ user, viewUser, deleteUser }) => {
  
  const ondeleteUser = () => {
    deleteUser(user.id).catch(error => console.log(error));
  };

  return (
    <ul className="collection">
      <li className="collection-item avatar" key={user.id}>
        <img src="images/yuna.jpg" alt="" className="circle" />
        <span className="title">{user.username}</span>
        <p>Role: {user.Role.title} </p>
        <p>Date Joined: {moment(user.createdAt).format('L')} </p>
        <a className="secondary-content" onClick={ondeleteUser}>
          <i className="close waves-effect waves-light material-icons">
            delete
          </i>
        </a>
         <div className="card-action">
            <button onClick={() => viewUser(user.id)}>View Document</button>
          </div>
      </li>
    </ul>
  );
};

UsersList.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
};
export default UsersList;
