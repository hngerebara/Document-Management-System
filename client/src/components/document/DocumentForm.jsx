import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as actions from './DocumentActions';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  customWidth: {
    width: 150,
  },
};

class DocumentForm extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      id: this.props.document ? this.props.document.id : null,
      documentName: this.props.document ? this.props.document.documentName :'',
      description: this.props.document ? this.props.document.description :'',
      access: this.props.document ? this.props.document.access :'',
      content: this.props.document ? this.props.document.content :'',   
      status: '',
      errors: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      id: nextProps.document.id,
      documentName: nextProps.document.documentName,
      description: nextProps.document.description,
      content: nextProps.document.content
    })
  }

  componentDidMount = () => {
    if (this.props.params.id) {
      this.props.actions.fetchDocument(this.props.params.id);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.props.document) {
      this.props.actions.createDocument(this.state);
      this.setState({
        documentName: '',
        desciption: '',
        content: '',
        access: ''
      });
    } else {
      this.props.actions.editDocument(this.state);
    }  
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <div>
             <h2>{this.props.document ? 'Edit' : 'Create'} Document</h2>
              <div>
                <TextField
                  hintText="Document Name"
                  floatingLabelText="Document Name"
                  name="documentName"
                  label="documentName"
                  value={this.state.documentName}
                  onChange={this.handleChange}
                /><br />
              </div>
              <div>
                <TextField
                  hintText="Document Description"
                  floatingLabelText="description"
                  name="description"
                  label="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                /><br />
              </div>
              <div>
                <label>Specify Access Type</label><br />
                <select
                  name="access"
                  id="access"
                  onChange={this.handleChange}
                  value={this.state.access}
                >
                  <option value="" disabled >Select Access Type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
            <div>
              <textarea
                name="content"
                id="content"
                value={this.state.content}
                onChange={this.handleChange}
                placeholder="Type your content here..."
              />
            </div>
            <div>
              <RaisedButton
                label="Submit"
                primary
                style={styles}
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state, props) => {
  if (props.params.id) {
    return {
      document: state.DocumentReducer.find((document) => document.id === parseInt(props.params.id))
    };
  }
  return { document: null }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
