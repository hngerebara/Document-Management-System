import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ViewDocument = ({ document, edit }) => {

  return (
    <div id="modal1" className="doc-modal modal modal-fixed-footer">
      <div className="modal-content">
        <h4>{document.documentName}</h4>
        <p>Description: {document.description}</p>
        <hr />
        <p>{document.content}</p>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          className="modal-action modal-close waves-effect waves-green btn-flat"
        >
          Close
        </a>
        { edit && 
          <Link 
            to={`/editDocument/${document.id}`} 
            className="modal-action waves-effect waves-light btn modal-close" 
          > <i className="material-icons left">mode_edit</i>
          Edit</Link>
        }
      </div>
    </div>
  );
};

ViewDocument.propTypes = {};

export default ViewDocument;
