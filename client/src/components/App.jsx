import React, { Component, PropTypes } from 'react';

/**
 * @desc App Component
 * @class App
 * @extends {Component}
 */
class App extends Component {
   /**
   * @desc renders Html
   * @returns {*} html
   * @memberof App
   */
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
