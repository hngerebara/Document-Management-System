import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

/**
 * @desc Pagination Component
 * @class Pagination
 * @extends {Component}
 */
export class Pagination extends Component {
/**
 * Creates an instance of Pagination.
 * @param {object} props property of element
 * @memberof Pagination
 */
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

/**
 * handle page change from pagination
 * @param {SytheticEvent} data
 */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * 6);
    this.props.fetchFn(offset);
  }

/**
 * handle page change from pagination after search
 * @param {SytheticEvent} data
 */
  searchClick = data => {
    const selected = data.selected;
    const search = this.props.searchQuery;
    const offset = Math.ceil(selected * 6);
    this.props.searchFn(search, offset);
  };
/**
 * @desc renders Html
 * @returns {*} html
 * @memberof Pagination
 */
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
