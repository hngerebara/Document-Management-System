import React, { Component } from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signOutUser from '../components/auth/CheckinActions';
// import PublicDocuments from '../components/document/PublicDocuments';
// import PrivateDocuments from '../components/document/PrivateDocuments';
// import RoleDocuments from '../components/document/RoleDocuments';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      token: window.localStorage.getItem('token')
    };
    this.onChange = this.handonChangeleChange.bind(this);
  }

  componentWillMount() {
    if (this.state.token) {
      this.setState({ userid: jwtDecode(this.state.token).user.id });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
      if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    return (
      <div>
      <Header />
        <p>All Document List this is the dashboard</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  documents: state.documentsReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch);


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashBoard)
  );
