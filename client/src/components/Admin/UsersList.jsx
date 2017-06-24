import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const UsersList = ({ user, deleteUser }) => {
  const ondeleteUser = () => {
    deleteUser(user.id)
      .catch(error => console.log(error));
  };

  return (
    <ul className="collection">
      <li className="collection-item avatar" key={user.id}>
        <img src="images/yuna.jpg" alt="" className="circle" />
        <span className="title">{user.username}</span>
        <p>Role: {user.roleTitle} </p>
        <p>Date Joined: {user.roleTitle} </p>
        <a className="secondary-content" onClick={ondeleteUser}>
          <i className="close waves-effect waves-light material-icons">close</i></a>
        <Link to={`/users/${user.creatorId}`}>
          <a className="btn-floating btn-small waves-effect waves-light purple">
          <i className="material-icons">visibility</i></a>
        </Link>

      </li>
    </ul>
  );
};

export default UsersList;
