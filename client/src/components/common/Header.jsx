import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../auth/AuthActions';
// import '../../styles/custom.scss';

class Header extends React.Component {
  constructor(props) {
    super();
    this.signOut = this.signOut.bind(this);
  }

  signOut(event) {
    event.preventDefault();
    this.props.actions.signOutUser();
  }

  render() {
    if (this.props.checked_in) {
      return (
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/publcdocuments" activeClassName="active">Public Documents</Link>
          {" | "}
           <Link to="/roledocuments" activeClassName="active">Role Documents</Link>
          {" | "}
          <Link to="/privatedocuments" activeClassName="active">Public Documents</Link>
          {" | "}
          <a href="/logout" onClick={this.signOut}>log out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/about" activeClassName="active">About</Link>
          {" | "}
           <Link to="/publcdocuments" activeClassName="active">Public Documents</Link>
          {" | "}
          <Link to="/checkin" activeClassName="active">Check-In</Link>
          {" | "}
          <Link to="/signup" activeClassName="active">Signup</Link>
          {/*{' | '}
          <Link to="/documentspage" activeClassName="active">Fetch Documents</Link>*/}
        </nav>
      );
    }
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {checked_in: state.session};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);