import React, { Component } from 'react';
import { Pagination } from 'antd';

import './MoviePagination.css';

export default class MoviePagination extends Component {
  render() {
    let { totalResults, setPage } = this.props;

    return (
      <Pagination
        className="movie-pagination"
        align="center"
        showSizeChanger={false}
        pageSize={20}
        defaultCurrent={1}
        total={totalResults}
        onChange={setPage}
      />
    );
  }
}
