import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../document/DocumentActions';

/**
 * @desc SearchBar Component
 * @class SearchBar
 * @extends {Component}
 */
export class SearchBar extends Component {
/**
 * Creates an instance of SearchBar.
 * @param {object} props property of element
 * @memberof SearchBar
 */
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
    };
  }

/**
 * handle searching
 * @param {SytheticEvent} event
 */
  onSearch = (event) => {
    const searchQuery = event.target.value;
    this.setState({
      isSearching: true,
    });
    this.props.search(searchQuery);
  }

/**
 * handle close search when done searching
 * @param {SytheticEvent} event
 */
  closeSearch = () => {
    this.setState({
      isSearching: false,
    });
    this.search.value = '';
    this.props.clearSearch();
  }

/**
 * @desc renders Html
 * @returns {*} html
 * @memberof SearchBar
 */
  render() {
    const isSearching = this.state.isSearching;
    return (
      <div>
        <input
          ref={ref => this.search = ref}
          type="text"
          id="search-input"
          placeholder="Search Here...."
          onChange={this.onSearch}
        />
        {isSearching &&
          <button id="search-btn" onClick={this.closeSearch}>Close search</button>}
      </div>
    );
  }
}
SearchBar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};


export default connect(null, {
  clearSearch,
})(SearchBar);
