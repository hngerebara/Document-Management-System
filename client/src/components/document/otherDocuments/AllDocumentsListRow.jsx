import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';


const AllDocumentsListRow = ({ document, user, viewDocument }) => {

  return (
    <div className="col s12 m6 l4">
        <div className="card small">
          <div className="card-image">
            <span className="card-title">{document.documentName}</span>
          </div>
          <span>Access Type: {document.access}</span> <div><br></br></div>
          <span>Date Created:  {moment(document.created_At).format('L')}</span>
          <div className="card-action">
            <button onClick={() => viewDocument(document.id)}>View Document</button>
          </div>
        </div>
      </div>

  );
};

AllDocumentsListRow.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  viewDocument: PropTypes.func.isRequired
};

export default AllDocumentsListRow;
