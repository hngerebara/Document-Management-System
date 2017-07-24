import React, { Component, PropTypes } from 'react';
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
    this.props.fetch(offset);
  }

/**
 * handle page change from pagination after search
 * @param {SytheticEvent} data
 */
  searchClick(data) {
    const selected = data.selected;
    const search = this.props.searchQuery;
    const offset = Math.ceil(selected * 6);
    this.props.search(search, offset);
  }
/**
 * @desc renders Html
 * @returns {*} html
 * @memberof Pagination
 */
  render() {
    const { isSearching, searchPagination, pagination } = this.props;
    return (
      <div className="pagination" id="pagination">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={
            isSearching ? searchPagination.pageCount : pagination.pageCount
          }
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={isSearching ? this.searchClick : this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}
Pagination.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  searchPagination: PropTypes.shape({}).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  search: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Pagination;
