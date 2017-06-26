import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow';

const DocumentList = ({
  documents,
  user,
  viewDocument
}) => (
   <div className="row">
        {documents.map(document => (
          <DocumentListRow
            key={document.id}
            document={document}
            user={user}
            viewDocument={viewDocument}
          />
          ))}
  </div>
  );

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default DocumentList;
