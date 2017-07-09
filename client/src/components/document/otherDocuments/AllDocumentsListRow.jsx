import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';


export const AllDocumentsListRow = ({ document, viewDocument }) => {

  return (
    <div className="col s12 m6 l4">
      <div className="card small">
        <div className="card-image">
          <span className="card-title">{document.documentName}</span>
        </div>
        <span>Access Type: {document.access}</span> <div><br></br></div>
        <span>Date Created:{moment(document.created_At).format('L')}</span>
        <div className="card-action">
          <a
            className="waves-effect waves-light btn-small right-align"
            onClick={() => viewDocument(document.id)}
          ><i className="material-icons right">visibility</i></a>
        </div>
      </div>
    </div>

  );
};

AllDocumentsListRow.propTypes = {
  document: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default AllDocumentsListRow;
