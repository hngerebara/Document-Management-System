import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import { ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import * as CheckinActions from '../../components/auth/AuthActions';
// import '../../styles/custom.scss';


class Header extends React.Component {
  // constructor(props) {
  //   super();
  //   this.signOut = this.signOut.bind(this);
  // }

  // signOut(event) {
  //   event.preventDefault();
  //   this.props.actions.signOutUser();
  // }

  render() {
    return (
      <AppBar
        title="Hopeaz DMS"
      >

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
          <ToolbarSeparator />
          <Link to="/documents">
            <RaisedButton label="Document List" />
          </Link>
          <ToolbarSeparator />
          <Link to="/documents/new">
            <RaisedButton label="Create Document" />
          </Link>
          <Link to="/">
            <RaisedButton label="Signout" />
          </Link>
        </ToolbarGroup>

      </AppBar>

    );
  }
}

// Header.propTypes = {
//   actions: PropTypes.object.isRequired
// };

// function mapStateToProps(state, ownProps) {
//   return { checked_in: state.session };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(CheckinActions, dispatch)
//   };
// }

export default Header;
