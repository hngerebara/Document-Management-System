import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserDocumentList from './UserDocumentList';
import SearchBar from '../../common/SearchBar';
import SideBar from '../../common/SideBar';
import ViewDocument from '../ViewDocument';

import {
  deleteDocument,
  fetchUserDocuments,
  searchUsersDocuments
} from '../DocumentActions';

class UsersDocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocument: {}
    }
  }
  

  componentDidMount() {
    this.props.fetchUserDocuments(this.props.params.creatorId);
  }

  viewDocument = (documentId) => {
    const { manageDocuments: { userDocuments } } = this.props;
    const document = userDocuments.find(doc => doc.id === documentId);
    if (document) {
      this.setState({ currentDocument: document });
      $('.doc-modal').modal('open');
    }
  }

  render() {
    const { manageDocuments, user } = this.props;
    return (
      <div>
       <main>
        <div className="container">
        <h1>My Documents </h1>
        <SideBar />
        <SearchBar />
        <UserDocumentList
          userDocuments={manageDocuments.userDocuments}
          user={user}
          deleteDocument={this.props.deleteDocument}
          viewDocument={this.viewDocument}
        />
      </div>
      <ViewDocument document={this.state.currentDocument} edit />
      </main>
      </div>
    );
  }
}

UsersDocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchUserDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  deleteDocument,
  fetchUserDocuments,
  searchUsersDocuments
})(UsersDocumentsPage);
