import React, {PropTypes} from 'react';
import DocumentListRow from './DocumentListRow';

const DocumentList = ({documents}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Title</th>
        <th>Access Type</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {documents.map(document =>
        <DocumentListRow key={document.id} document={document}/>
      )}
      </tbody>
    </table>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;
