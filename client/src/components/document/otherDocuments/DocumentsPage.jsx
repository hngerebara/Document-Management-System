import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import SearchBar from '../../search/SearchBar';
import {
  deleteDocument,
  fetchUserDocuments,
  fetchAllDocuments,
  viewDocument,
  searchAllDocuments,
  clearSearch
} from '../DocumentActions';

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    if (!props.manageDocuments) {
      return <div>Loading...</div>;
    }
  }

  componentDidMount() {
    this.props.fetchAllDocuments();
  }

  render() {
    const { manageDocuments, user } = this.props;
    return (
      <div>
        <h3>All documents </h3>
        <SearchBar />
        <DocumentList
          documents={manageDocuments.isSearching ? manageDocuments.searchDocuments : manageDocuments.documents}
          user={user}
          deleteDocument={this.props.deleteDocument}
          viewDocument={this.props.viewDocument}
          searchAllDocument={searchAllDocuments}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  fetchUserDocuments: PropTypes.func.isRequired,
  viewDocument: PropTypes.func.isRequired
  
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  deleteDocument,
  fetchUserDocuments,
  fetchAllDocuments,
  viewDocument,
  searchAllDocuments,
  clearSearch
})(DocumentsPage);
