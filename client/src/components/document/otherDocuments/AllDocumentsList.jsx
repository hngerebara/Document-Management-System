import React, { PropTypes } from 'react';
import AllDocumentsListRow from './AllDocumentsListRow';

const AllDocumentsList = ({
  documents,
  user,
  viewDocument
}) => (
   <div className="row">
        {documents.map(document => (
          <AllDocumentsListRow
            key={document.id}
            document={document}
            user={user}
            viewDocument={viewDocument}
          />
          ))}
  </div>
  );

AllDocumentsList.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default AllDocumentsList;
