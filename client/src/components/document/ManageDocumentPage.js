import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from './DocumentActions';
import DocumentForm from './DocumentForm';
// import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageDocumentPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: {
        id: this.props.document.id ? this.props.document.id : null,
        documentName: this.props.document.id ? this.props.document.documentName : '',
        description: this.props.document.id ? this.props.document.description : '',
        access: this.props.document.id ? this.props.document.access : 'public',
        content: this.props.document.id ? this.props.document.content : ''
      },
      errors: {},
      saving: false
    };
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
  }

componentDidMount() {
  const currentPath = location.pathname;
  if (currentPath === '/documents/new') {
    const document = this.state.document;
    this.setState({ document });
  }
}
  componentWillReceiveProps(nextProps) {
    if (this.props.document.id != nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }


  saveDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.createDocument(this.state.document)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document saved');
    this.context.router.push('/documents');
  }

  render() {
    return (
      <DocumentForm
        onChange={this.updateDocumentState}
        onSave={this.saveDocument}
        document={this.state.document}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageDocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageDocumentPage.contextTypes = {
  router: PropTypes.object
};

function getDocumentById(documents, id) {
  const document = documents.filter(document => document.id == id);
  if (document) return document[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id;

  let document = { id: '', documentName: '', description: '', access: '', content: '' };

  if (documentId && state.documents) {
    document = getDocumentById(state.documents, documentId);
  }

  return {
    document,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
