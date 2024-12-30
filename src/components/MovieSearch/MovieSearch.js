import React, { Component } from 'react';

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

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  render() {
    return (
      <div className="movie-search">
        <input
          className="movie-search__input"
          placeholder="Type to search..."
          ref={this.inputRef}
          onChange={this.debounce(this.findWord, 500)}
        ></input>
      </div>
    );
  }
}
