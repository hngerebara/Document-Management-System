import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { searchAllDocuments, clearSearch } from "../document/DocumentActions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
  }

  docsSearch = event => {
    const searchQuery = event.target.value;
    this.setState({
      isSearching: true
    });
    this.props.searchAllDocuments(searchQuery);
  };

  closeSearch = () => {
    this.setState({
      isSearching: false
    });
    this.search.value = "";
    this.props.clearSearch();
  };
  render() {
    const { manageDocuments, user } = this.props;
    const isSearching = this.state.isSearching;
    return (
      <div>
        <input
          ref={ref => this.search = ref}
          type="text"
          placeholder="Search Documents"
          onChange={this.docsSearch}
        />
        {isSearching &&
          <button onClick={this.closeSearch}>Close search</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manageDocuments: state.DocumentReducer
});

export default connect(mapStateToProps, {
  searchAllDocuments,
  clearSearch
})(SearchBar);
