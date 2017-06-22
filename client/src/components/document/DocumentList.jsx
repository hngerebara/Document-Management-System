import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow';

const DocumentList = ({ documents, user, deleteDocument, viewDocument }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access Type</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(document =>
            <DocumentListRow
              key={document.id}
              document={document}
              user={user}
              deleteDocument={deleteDocument} 
              viewDocument={viewDocument}
            />
        )}
        </tbody>
      </table>
    </div>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default DocumentList;
