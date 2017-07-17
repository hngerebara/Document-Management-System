import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * @desc ViewDocument Component
 * @class ViewDocument
 * @extends {Component}
 */
class ViewDocument extends Component {
  /**
 * @desc call ViewDocument modal before component mounts
 * @memberof ViewDocument
 * @returns {null} returns null
 */
  componentDidMount() {
    if (API_URL !== '9999') {
      $('.doc-modal').modal();
    }
  }

  /**
   * @desc renders Html
   * @returns {*} html
   * @memberof ViewDocument
   */
  render() {
    const { edit, document } = this.props;
    return (
      <div id="modal1" className="doc-modal modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{document.documentName}</h4>
          <p>Description: {document.description}</p>
          <hr />
          <p
            className="innerhtml margin-5px"
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Close
          </a>
          {edit &&
            <Link
              to={`/editDocument/${document.id}`} id="view-edit"
              className="modal-action waves-effect waves-light btn modal-close"
            >
              {' '}<i className="material-icons left">mode_edit</i>
              Edit
            </Link>}
        </div>
      </div>
    );
  }
}
ViewDocument.propTypes = {
  document: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default ViewDocument;
