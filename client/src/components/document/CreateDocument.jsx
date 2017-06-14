import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import Sidebar from './Sidebar.jsx';
import * as actions from '../document/DocumentActions';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  customWidth: {
    width: 150,
  },
};

class CreateDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentName: '',
      description: '',
      content: '',
      access: '',
      status: '',
      errors: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.createDocument(this.state);
  }

  render() {
    return (
      <div>
        <div>
          <div><h4>Create A Document</h4></div>
          <form>
            <div>
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

export default connect(null, mapDispatchToProps)(CreateDocument);
