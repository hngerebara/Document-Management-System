import React, { Component, PropTypes } from 'react';
import Footer from './common/Footer.jsx';
import Header from './common/Header.jsx'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired
};

export default App;
