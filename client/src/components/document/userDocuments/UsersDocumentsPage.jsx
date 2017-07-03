import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import UserDocumentList from "./UserDocumentList";
import SearchBar from "../../common/SearchBar";
import ReactPaginate from 'react-paginate';
import SideBar from "../../common/SideBar";
import ViewDocument from "../ViewDocument";
import Header from "../../common/Header";

import {
  deleteDocument,
  fetchUserDocuments,
  searchUsersDocuments,
  clearSearch
} from "../DocumentActions";

class UsersDocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocument: {}
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  componentDidMount() {
    (this.props.manageDocuments.isSearching ?
    this.props.searchUsersDocuments(this.props.params.creatorId) :
    this.props.fetchUserDocuments(this.props.params.creatorId));
  }


  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 6);
    this.props.fetchUserDocuments(offset);
  }

searchClick = (data) => {
    const selected = data.selected;
    const search = this.props.manageDocuments.searchQuery;
    const offset = Math.ceil(selected * 6);
    this.props.searchUsersDocuments(search, offset);
  }

  viewDocument = documentId => {
    const { manageDocuments: { userDocuments } } = this.props;
    const document = userDocuments.find(doc => doc.id === documentId);
    if (document) {
      this.setState({ currentDocument: document });
      $(".doc-modal").modal("open");
    }
  };

  render() {
    const { manageDocuments, user } = this.props;
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <h1>My Documents </h1>
            <SideBar />
            <SearchBar />
            <UserDocumentList
            userDocuments={manageDocuments.isSearching ?
            manageDocuments.searchUserDocuments :
            manageDocuments.userDocuments}
              user={user}
              deleteDocument={this.props.deleteDocument}
              viewDocument={this.viewDocument}
              searchUserDocument={searchUsersDocuments}
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
          <ViewDocument document={this.state.currentDocument} edit />
        </div>
        </div>
        </main>
      </div>
    );
  }
}

UsersDocumentsPage.propTypes = {
  manageDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  fetchUserDocuments: PropTypes.func.isRequired,
  searchUsersDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  deleteDocument,
  fetchUserDocuments,
  searchUsersDocuments,
  clearSearch
})(UsersDocumentsPage);
