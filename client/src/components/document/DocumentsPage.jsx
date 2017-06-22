import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import UserDocumentList from './UserDocumentList';
import {
  deleteDocument,
  fetchUserDocuments,
  fetchAllDocuments,
  fetchDocument
} from './DocumentActions';

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    if (!props.manageDocuments) {
      return <div>Loading...</div>;
    }

    this.state = { page: 'document' };
  }

  componentDidMount() {
    if (this.props.location.pathname === '/documents') {
      this.props.fetchAllDocuments();
      this.setState({ page: 'document' });
    } else if (this.props.params.creatorId) {
      this.props.fetchUserDocuments(this.props.params.creatorId);
          this.setState({ page: 'userdocuments' });
    }
  }

  documentRow(document, index) {
    return <div key={index}>{document.documenName}</div>;
  }

  render() {
    const { manageDocuments, user } = this.props;
    const { page } = this.state;

    // if (this.props.documents.length === 0) {
    //   return (
    //     <div>
    //         No document available here.... yet.
    //     </div>
    //   );
    // }
    return (
      <div>
        {page === 'document' &&
          <div>
            <h1>All documents </h1>
            <DocumentList
              documents={manageDocuments.documents}
              user={user}
              deleteDocument={this.props.deleteDocument}
              fetchDocument={this.props.fetchDocument}
            />
          </div>}

        {page === 'userdocuments' &&
          <div>
            <h1>My Documents </h1>
            <UserDocumentList
              userDocuments={manageDocuments.userDocuments}
              user={user}
              deleteDocument={this.props.deleteDocument}
              fetchDocument={this.props.fetchDocument}
            />
          </div>}
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  fetchUserDocuments: PropTypes.func.isRequired,
  fetchDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch)
// });

export default connect(mapStateToProps, {
  deleteDocument,
  fetchUserDocuments,
  fetchAllDocuments,
  fetchDocument
})(DocumentsPage);
