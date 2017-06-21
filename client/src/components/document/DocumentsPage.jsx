import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentList from './DocumentList';
import * as actions from './DocumentActions';

class DocumentsPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.fetchAllDocuments();
  }

  documentRow(document, index) {
    return <div key={index}>{document.documenName}</div>;
  }

  render() {
    const { documents } = this.props;
    return (
      <div>
        <h1>All documents </h1>
        <DocumentList documents={documents} />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  documents: state.DocumentReducer,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);

