import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

export class Pagination extends Component {
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 6);
    this.props.fetchFn(offset);
  }

  searchClick = data => {
    const selected = data.selected;
    const search = this.props.searchQuery;
    const offset = Math.ceil(selected * 6);
    this.props.searchFn(search, offset);
  };

  render() {
    const { isSearching, searchPagination, pagination } = this.props;
    
    return (
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={
            isSearching ? searchPagination.pageCount : pagination.pageCount
          }
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={isSearching ? this.searchClick : this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default Pagination;
