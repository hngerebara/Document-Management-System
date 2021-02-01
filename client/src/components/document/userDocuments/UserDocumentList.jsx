import React, { PropTypes } from 'react';
import { UserDocumentListRow } from './UserDocumentListRow';

const UserDocumentList = ({
  userDocuments,
  user,
  deleteDocument,
  viewDocument }) => (
    <div className="row" id="userdocument-list">
      {userDocuments.reverse().map(document =>
        <UserDocumentListRow
          key={document.id}
          document={document}
          user={user}
          deleteDocument={deleteDocument}
          viewDocument={viewDocument}
        />)}
    </div>
  );

UserDocumentList.propTypes = {
  userDocuments: PropTypes.array.isRequired,
  user: PropTypes.shape({}).isRequired,
  deleteDocument: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired,
};

export default UserDocumentList;
