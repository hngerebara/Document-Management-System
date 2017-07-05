import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import UserDocumentList from "./UserDocumentList";
import SideBar from "../../common/SideBar";
import ViewDocument from "../ViewDocument";
import Header from "../../common/Header";

import {
  deleteDocument,
  fetchUserDocuments
} from "../DocumentActions";

class UsersDocumentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocument: {}
    };
  }

  componentDidMount() {
    this.props.fetchUserDocuments(this.props.params.creatorId);
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
    const creatorId = this.props.params.creatorId;
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <h1>My Documents </h1>
            <SideBar />
            <UserDocumentList
              userDocuments={manageDocuments.userDocuments}
              user={user}
              deleteDocument={this.props.deleteDocument}
              viewDocument={this.viewDocument}
            />
              <ViewDocument document={this.state.currentDocument} edit />
          </div>
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
})(UsersDocumentsPage);
