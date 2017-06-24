import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserDocumentList from './UserDocumentList';

import {
  deleteDocument,
  fetchUserDocuments,
  viewDocument,
  searchUsersDocuments
} from './DocumentActions';

class UsersDocumentsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserDocuments(this.props.params.creatorId);
  }

  render() {
    const { manageDocuments, user } = this.props;

    return (
      <div>
        <h1>My Documents </h1>
        
        <UserDocumentList
          userDocuments={manageDocuments.userDocuments}
          user={user}
          deleteDocument={this.props.deleteDocument}
          viewDocument={this.props.viewDocument}
        />
      </div>
    );
  }
}

UsersDocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchUserDocuments: PropTypes.func.isRequired,
  searchUsersDocuments: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  deleteDocument,
  fetchUserDocuments,
  viewDocument,
  searchUsersDocuments
})(UsersDocumentsPage);
