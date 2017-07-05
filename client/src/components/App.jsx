import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
