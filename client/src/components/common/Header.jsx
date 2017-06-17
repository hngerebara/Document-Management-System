import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../components/auth/AuthActions';
import AppBar from 'material-ui/AppBar';
import { ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

// import '../../styles/custom.scss';


class Header extends React.Component {
  constructor(props) {
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    console.log(event)
    event.preventDefault();
    this.props.actions.signOutUser();
  }


  render() {
    const { isAuthenticated } = this.props.Auth;


    const userLinks = (
        <ToolbarGroup>
          <ToolbarSeparator />
          <Link to="/">
            <RaisedButton label="Home" />
          </Link>
          <ToolbarSeparator />
          <Link to="/about">
            <RaisedButton label="About" />
          </Link>
          <Link to="/documents">
            <RaisedButton label="Document List" />
          </Link>
          <ToolbarSeparator />
          <Link to="/documents/new">
            <RaisedButton label="Create Document" />
          </Link>
          <Link to="/">
            <RaisedButton label="Signout" onClick={this.signOut} />
          </Link>
        </ToolbarGroup>
    );

    const guestLinks = (
        <ToolbarGroup>
          <ToolbarSeparator />
          <Link to="/">
            <RaisedButton label="Home" />
          </Link>
          <ToolbarSeparator />
          <Link to="/about">
            <RaisedButton label="About" />
          </Link>
          <ToolbarSeparator />
          <Link to="/checkin">
            <RaisedButton label="CheckIn" />
          </Link>
          <ToolbarSeparator />
          <Link to="/signup">
            <RaisedButton label="Sign up" />
          </Link>
        </ToolbarGroup>
    );


    return (
      <AppBar
        title="Hopeaz DMS">
        { isAuthenticated ? userLinks : guestLinks }
      </AppBar>

    );
  }
}

// Header.propTypes = {
//   auth: PropTypes.object.isRequired,
//   actions: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {  Auth: state.Auth };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
