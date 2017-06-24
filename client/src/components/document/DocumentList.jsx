import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow';

const DocumentList = ({
  documents,
  user,
  viewDocument
}) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Access Type</th>
        </tr>
      </thead>
      <tbody>
        {documents.map(document => (
          <DocumentListRow
            key={document.id}
            document={document}
            user={user}
            viewDocument={viewDocument}
          />
          ))}
      </tbody>
    </table>
  </div>
  );

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default DocumentList;
