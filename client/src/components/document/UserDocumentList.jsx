import React, { PropTypes } from 'react';
import UserDocumentListRow from './UserDocumentListRow';

const UserDocumentList = ({ userDocuments, user, deleteDocument, fetchDocument }) => {
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
          {userDocuments.map(document =>
            <UserDocumentListRow
              key={document.id}
              document={document}
              user={user}
              deleteDocument={deleteDocument} 
              fetchDocument={fetchDocument}
            />
        )}
        </tbody>
      </table>
    </div>
  );
};

UserDocumentList.propTypes = {
  userDocuments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchDocument: PropTypes.func.isRequired
};

export default UserDocumentList;
