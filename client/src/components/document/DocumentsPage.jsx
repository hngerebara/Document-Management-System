import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import {
  deleteDocument,
  fetchUserDocuments,
  fetchAllDocuments,
  viewDocument,
  searchAllDocuments,
  clearSearch
} from './DocumentActions';

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isSearching: false,
    }
    if (!props.manageDocuments) {
      return <div>Loading...</div>;
    }
  }

  componentDidMount() {
    this.props.fetchAllDocuments();
  }

   docsSearch = (event) => {
    const searchQuery = event.target.value;
    this.setState({
      isSearching: true
    })
    this.props.searchAllDocuments(searchQuery);
  };

  closeSearch = () => {
    this.setState({
      isSearching: false,
    });
    this.search.value = '';
    this.props.clearSearch();
  }

  render() {
    const { manageDocuments, user } = this.props;
    const isSearching = this.state.isSearching;
    return (
      <div>
        <h3>All documents </h3>
        <input
          ref={ref => this.search = ref}
          type="text"
          placeholder="Search Documents"
          onChange={this.docsSearch}
        />
        {isSearching &&
          <button onClick={this.closeSearch}>Close search</button>
        }
        <DocumentList
          documents={isSearching ? manageDocuments.searchDocuments : manageDocuments.documents}
          user={user}
          deleteDocument={this.props.deleteDocument}
          viewDocument={this.props.viewDocument}
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
  searchAllDocuments: PropTypes.func.isRequired,
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
