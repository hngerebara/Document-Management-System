import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../document/DocumentActions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
  }

  onSearch = event => {
    const searchQuery = event.target.value;
    this.setState({
      isSearching: true
    });
    this.props.searchFn(searchQuery);
  };

  closeSearch = () => {
    this.setState({
      isSearching: false
    });
    this.search.value = '';
    this.props.clearSearch();
  };
  render() {
    const { user } = this.props;
    const isSearching = this.state.isSearching;
    return (
      <div>
        <input
          ref={ref => this.search = ref}
          type="text"
          placeholder="Search Here...."
          onChange={this.onSearch}
        />
        {isSearching &&
          <button onClick={this.closeSearch}>Close search</button>}
      </div>
    );
  }
}


export default connect(null, {
  clearSearch
})(SearchBar);
