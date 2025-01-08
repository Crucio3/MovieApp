import React, { Component } from 'react';
import debounce from 'lodash/debounce.js';

import './MovieSearch.css';

export default class MovieSearch extends Component {
  state = {
    label: '',
  };

  inputRef = React.createRef();

  findWord = () => {
    let inputValue = this.inputRef.current.value;
    const { takeSearchWord } = this.props;
    takeSearchWord(inputValue);
  };

  render() {
    const delaySearch = debounce(this.findWord, 500);

    return (
      <div className="movie-search">
        <input
          className="movie-search__input"
          placeholder="Type to search..."
          ref={this.inputRef}
          onChange={delaySearch}
        ></input>
      </div>
    );
  }
}
