import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const DocumentList = ({ document, deleteDocument }) => {

  const ondeleteDocument = () => {
    console.log("geting here")
    deleteDocument(document.id)
  }
  return (
  <Card key={document.id}>
    <CardHeader
      title={document.documentName}
      subtitle={document.access}
      actAsExpander
      showExpandableButton
    />
    <CardActions>
      <Link to={`/documents/${document.id}`}><FlatButton label="Edit" /></Link>
      <FlatButton label="Delete" onClick={ondeleteDocument} />
    </CardActions>
    <CardText expandable>
      {document.description}
      {document.content}
    </CardText>
  </Card>
  )};

export default DocumentList;
