import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import MovieItem from './components/MovieItem/MovieItem.js';
import MovieService from './service/MovieService/MovieService.js';
import MovieSearch from './components/MovieSearch/MovieSearch.js';
import MoviePagination from './components/MoviePagination/MoviePagination.js';
import { MovieProvider } from './components/MovieContext/MovieContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

class MovieApp extends Component {
  movieService = new MovieService();

  state = {
    searchMovie: '',
    movies: [],
    totalResults: 0,
    page: 1,
    genres: [],
  };

  takeSearchWord = (word) => {
    this.setState(
      () => {
        return { searchMovie: word };
      },
      () => {}
    );
  };

  componentDidMount() {
    this.movieService.getPopularTitles(this.state.page).then((body) => {
      this.setState(
        () => {
          return { movies: body.results, totalResults: body.total_results };
        },
        () => {}
      );
    });
    this.movieService.getGenres().then((body) => {
      this.setState({ genres: body.genres });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchMovie !== this.state.searchMovie || prevState.page !== this.state.page) {
      if (this.state.searchMovie !== '') {
        this.movieService.searchTitle(this.state.page, this.state.searchMovie).then((body) => {
          this.setState(
            () => {
              return { movies: body.results, totalResults: body.total_results };
            },
            () => {}
          );
        });
      } else {
        this.movieService.getPopularTitles(this.state.page).then((body) => {
          this.setState(
            () => {
              return { movies: body.results, totalResults: body.total_results };
            },
            () => {}
          );
        });
      }
    }
  }

  setPage = (page) => {
    this.setState({ page: page });
  };

  render() {
    let list = [];
    for (let i = 0; i < this.state.movies.length; i++) {
      list.push(<MovieItem i={i} key={this.state.movies[i].id} movie={this.state.movies[i]} />);
    }
    return (
      <div className="main">
        <MovieProvider value={{ genres: this.state.genres }}>
          <MovieSearch takeSearchWord={this.takeSearchWord} />
          <div className="movie-app">{list}</div>
          <MoviePagination totalResults={this.state.totalResults} setPage={this.setPage} />
        </MovieProvider>
      </div>
    );
  }
}

root.render(<MovieApp />);
