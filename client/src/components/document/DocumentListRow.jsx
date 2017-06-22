import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const DocumentListRow = ({ document, user, deleteDocument, fetchDocument }) => {
  const isOwner = document.creatorId === user.id;

  return (
    <tr>
      <td>{document.documentName}</td>
      <td>{document.access}</td>
       <td><button onClick={() => fetchDocument(document.id)}>View Document</button></td>
      {isOwner &&
        <tr>
          <td><button><Link to={`/documents/${document.id}`}>Edit Document</Link></button></td>
          <td><button onClick={() => deleteDocument(document.id)}>Delete Document</button></td>
        </tr>
      }
    </tr>

  );
};

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchDocument: PropTypes.func.isRequired

};

export default DocumentListRow;
