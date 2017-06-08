import React, { Component, PropTypes } from 'react';
// import Footer from '../components/Footer.jsx';
import Header from './common/Header.jsx'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
        <p>Footer here</p>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
