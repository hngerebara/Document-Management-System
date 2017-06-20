import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import * as actions from './DocumentActions';

class DocumentsPage extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
      this.props.actions.fetchAllDocuments();
  }

  render() {
    const { documents, user, action } = this.props;
    return (
      <div>
        <h1>All documents </h1>
        <ul>
          {
            documents.map((document, index) =>
              <DocumentList
                key={index}
                document={document}
                deleteDocument={actions.deleteDocument}
                user={user}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    documents: state.DocumentReducer,
    user: state.Auth.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);

