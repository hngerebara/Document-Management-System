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
         <span>Access Type: {document.access}</span> <div><br></br></div>
          <span>Date Published:  {moment(document.created_At).format('L')}</span>
        <div className="card-action">
          <button onClick={() => viewDocument(document.id)} >
            View Document
          </button>
          {isOwner &&
            <div>
              <button onClick={() => deleteDocument(document.id)}>
                Delete Document
              </button>
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
