import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const UsersList = ({ user, deleteUser }) => {

  const ondeleteUser = () => {
    deleteUser(user.id);
  };

  return (
    <Card key={user.id}>
      <CardHeader
        title={user.username}
      />
      <CardActions>
          <div>
            <Link to={`/users/${user.creatorId}`}>
              <FlatButton label="View user Documents" />
            </Link>
            <FlatButton label="Delete User" onClick={ondeleteUser} />
          </div>
      </CardActions>
    </Card>
  )};


export default UsersList;
