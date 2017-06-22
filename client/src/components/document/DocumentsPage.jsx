import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import { deleteDocument, fetchAllDocuments, fetchDocument } from './DocumentActions';

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    if (!props.documents) {
      return (
        <div>Loading...</div>
      );
    }
  }

  componentDidMount() {
    this.props.fetchAllDocuments();
  }

  documentRow(document, index) {
    return <div key={index}>{document.documenName}</div>;
  }

  render() {
    const { documents, user } = this.props;
    // if (this.props.documents.length === 0) {
    //   return (
    //     <div>
    //         No document available here.... yet.
    //     </div>
    //   );
    // }

    return (
      <div>
        <h1>All documents </h1>
        <DocumentList
          documents={documents}
          user={user}
          deleteDocument={this.props.deleteDocument}
          fetchDocument={this.props.fetchDocument}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  fetchDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documents: state.DocumentReducer,
  user: state.Auth.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, { deleteDocument, fetchAllDocuments, fetchDocument })(DocumentsPage);

