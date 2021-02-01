/**
 * Helper class for controllers
 *
 * @export
 * @class Helpers
 */
export default class Helpers {
/**
  * paginate - For pagination
  * @param {number} limit - number of items to include
  * @param {number} offset - array index to start from
  * @param {Array} arrayList -  array to paginate
  * @return {Object} paginated object
  */
  static paginate(limit, offset, arrayList) {
    return {
      totalCount: arrayList.count,
      pageCount: Math.ceil(arrayList.count / limit),
      page: Math.floor(offset / limit) + 1,
      rowsPerPage: limit > arrayList.count
        ? arrayList.count : limit
    };
  }
}
