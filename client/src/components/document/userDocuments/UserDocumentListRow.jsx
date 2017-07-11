import React, { Component, PropTypes } from 'react';
import moment from 'moment';

/**
 * @desc UserDocumentListRow Component
 * @class UserDocumentListRow
 * @extends {Component}
 */
class UserDocumentListRow extends Component {
  /**
 * Creates an instance of UserDocumentListRow.
 * @param {object} props property of element
 * @memberof UserDocumentListRow
 */
  constructor(props) {
    super(props);
  }

  render() {
    const { document, user, viewDocument, deleteDocument } = this.props;
    const isOwner = document.creatorId === user.id;

    return (
      <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <span className="card-title">{document.documentName}</span>
          </div>
          <div className="card-content">
            <span>Access Type: {document.access}</span> <div><br /></div>
            <span>
              Date Published:{moment(document.created_At).format('L')}
            </span>
          </div>
          <div className="card-action">
            <a
              id="view-link"
              className="waves-effect waves-light btn-small"
              onClick={() => viewDocument(document.id)}
            >
              <i className="material-icons">visibility</i>
            </a>
            {isOwner &&
              <div>
                <a
                  className="waves-effect waves-light btn-small"
                  id="delete-link"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteDocument(document.id);
                  }}
                >
                  <i className="material-icons">delete_forever</i>
                </a>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}

UserDocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default UserDocumentListRow;
