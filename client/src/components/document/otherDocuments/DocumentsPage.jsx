import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import DocumentList from './DocumentList';
import SearchBar from '../../common/SearchBar';
import SideBar from '../../common/SideBar';
import ViewDocument from '../ViewDocument';

import {
  deleteDocument,
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
    this.state = {
      currentDocument: {},
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    (this.props.manageDocuments.isSearching ?
    this.props.searchAllDocuments() :
    this.props.fetchAllDocuments());
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 5);
    this.props.fetchAllDocuments(offset);
  }

  searchClick = (data) => {
    console.log(data, "data on searchclik")
    const selected = data.selected;
    const search = this.props.manageDocuments.searchQuery;
    const offset = Math.ceil(selected * 5);
    this.props.searchAllDocuments(search, offset);
  }

  viewDocument = (documentId) => {
    const { manageDocuments } = this.props;
    const documents = manageDocuments.isSearching ? manageDocuments.searchDocuments :
      manageDocuments.documents
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      this.setState({ currentDocument: document });
      $('.doc-modal').modal('open');
    }
  }

  render() {
    const { manageDocuments, user } = this.props;
    console.log(manageDocuments, "in render");
    return (
      <div>
      <main>
        <div className="container">
        <h3>All documents </h3>
         <SideBar />
        <SearchBar />

        <DocumentList
          documents={manageDocuments.isSearching ?
            manageDocuments.searchDocuments :
            manageDocuments.documents}
          user={user}
          deleteDocument={this.props.deleteDocument}
          viewDocument={this.viewDocument}
          searchAllDocument={searchAllDocuments}
        />
        
         <div className="docpagination">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={manageDocuments.isSearching ?
            manageDocuments.searchPagination.page_count :
            manageDocuments.pagination.page_count}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={manageDocuments.isSearching ?
            this.searchClick : this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
          <ViewDocument document={this.state.currentDocument} />
          </div>

      </div>
      </main>
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchAllDocuments: PropTypes.func.isRequired,
  searchAllDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  deleteDocument,
  fetchAllDocuments,
  viewDocument,
  searchAllDocuments,
  clearSearch
})(DocumentsPage);
