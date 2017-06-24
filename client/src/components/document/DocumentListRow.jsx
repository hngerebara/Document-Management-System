import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const DocumentListRow = ({ document, user, viewDocument }) => {

  return (
    <tr>
        <td>{document.documentName}</td>
        <td>{document.access}</td>
        <td><button onClick={() => viewDocument(document.id)}>View Document</button></td>
      </tr>

  );
};

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default DocumentListRow;
