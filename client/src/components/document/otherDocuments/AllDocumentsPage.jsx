import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import AllDocumentsList from "./AllDocumentsList";
import SearchBar from "../../common/SearchBar";
import SideBar from "../../common/SideBar";
import ViewDocument from "../ViewDocument";
import Header from "../../common/Header";
import Pagination from '../../common/Pagination';

import {
  deleteDocument,
  fetchAllDocuments,
  searchAllDocuments,
  clearSearch
} from "../DocumentActions";

class AllDocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocument: {}
    };
  }

  componentDidMount() {
    this.props.fetchAllDocuments();
  }

  viewDocument = documentId => {
    const { manageDocuments } = this.props;
    const documents = manageDocuments.documents;
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      this.setState({ currentDocument: document });
      $(".doc-modal").modal("open");
    }
  };

  render() {
    const { manageDocuments, user } = this.props;
    const documents = manageDocuments.isSearching
                  ? manageDocuments.searchDocuments
                  : manageDocuments.documents

    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <h1>All documents </h1>
            <SideBar />
            <SearchBar searchFn={this.props.searchAllDocuments}/>
            <AllDocumentsList
              documents = {documents}
              user={user}
              deleteDocument={this.props.deleteDocument}
              viewDocument={this.viewDocument}
            />
    { documents.length > 0 &&
            <Pagination 
            searchQuery={manageDocuments.searchQuery}
            fetchFn={this.props.fetchAllDocuments}
            searchFn={this.props.searchAllDocuments}
            isSearching={manageDocuments.isSearching}
            pagination={manageDocuments.pagination}
            searchPagination={manageDocuments.searchPagination}
            />
   }
            
            <ViewDocument document={this.state.currentDocument} />
          </div>
        </main>
      </div>
    );
  }
}

AllDocumentsPage.propTypes = {
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
  searchAllDocuments,
  clearSearch
})(AllDocumentsPage);
