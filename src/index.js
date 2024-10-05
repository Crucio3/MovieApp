import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import MovieItem from './components/MovieItem/MovieItem';

const root = ReactDOM.createRoot(document.getElementById('root'));

class MovieApp extends Component {
  render() {
    return (
      <div className="movie-app">
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <MovieItem />
      </div>
    );
  }
}

root.render(<MovieApp />);
