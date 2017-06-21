import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const DocumentListRow = ({document}) => {
  return (
    <tr>
      <td>{document.documentName}</td>
      <td>{document.access}</td>
      <td><Link to={'/documents/' + document.id}>View Document</Link></td>
    </tr>
  );
};

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired
};

export default DocumentListRow;