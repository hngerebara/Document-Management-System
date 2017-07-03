import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const UserDocumentListRow = ({
  document,
  user,
  deleteDocument,
  viewDocument
}) => {
  const isOwner = document.creatorId === user.id;
  return (
    <div className="col s12 m6 l4">
      <div className="card small">
        <div className="card-image">
          <span className="card-title">{document.documentName}</span>
        </div>
        <span>Access Type: {document.access}</span> <div><br /></div>
        <span>Date Published:{moment(document.created_At).format('L')}</span>
        <div className="card-action">
          <a
            className="waves-effect waves-light btn-small"
            onClick={() => viewDocument(document.id)}
          ><i className="material-icons">visibility</i></a>
          {isOwner &&
            <div>
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => deleteDocument(document.id)}
              ><i className="material-icons">delete_forever</i></a>
            </div>}
        </div>
      </div>
    </div>
  );
};

UserDocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default UserDocumentListRow;
