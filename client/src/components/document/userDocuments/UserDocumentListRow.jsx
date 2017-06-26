import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const UserDocumentListRow = ({ document, user, deleteDocument, viewDocument }) => {
  const isOwner = document.creatorId === user.id;

  return (
    <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <img src="" />
            <span className="card-title">{document.documentName}</span>
          </div>
          <p>{document.access}</p>
          <p>{(document.created_At)}</p>
          <div className="card-content">
            <p>{document.description}</p>
          </div>
          <div className="card-action">
            <button onClick={() => viewDocument(document.id)}>View Document</button>
            {isOwner &&
              <div>
       <button><Link to={`/editDocument/${document.id}`}>Edit Document</Link></button>
       <button onClick={() => deleteDocument(document.id)}>Delete Document</button>
       </div>
      }
            <a href="#" className="blue-text">Delete</a>
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
