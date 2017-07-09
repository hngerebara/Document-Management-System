import React, { PropTypes } from 'react';
import AllDocumentsListRow from './AllDocumentsListRow';

const AllDocumentsList = ({
  documents,
  viewDocument
}) => (
  <div className="row">
    {documents.map(document => (
      <AllDocumentsListRow
        key={document.id}
        document={document}
        viewDocument={viewDocument}
      />
    ))}
  </div>
  );

AllDocumentsList.propTypes = {
  documents: PropTypes.array.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default AllDocumentsList;
