import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import './index.css';

import MovieItem from './components/MovieItem/MovieItem.js';
import MovieService from './service/MovieService/MovieService.js';
import MovieSearch from './components/MovieSearch/MovieSearch.js';
import MoviePagination from './components/MoviePagination/MoviePagination.js';
import Header from './components/Header/Header.js';
import GetRatedMovies from './components/GetRatedMovies/GetRatedMovies.js';
import GetSearchMovies from './components/GetSearchMovies/GetSearchMovies.js';
import { MovieProvider } from './components/MovieContext/MovieContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default class MovieApp extends Component {
  movieService = new MovieService();

  state = {
    searchMovie: '',
    movies: [],
    totalResults: 0,
    page: 1,
    genres: [],
    sessionId: '',
    activeTab: 'Search',
    error: false,
  };

  takeSearchWord = (word) => {
    this.setState(
      () => {
        return { searchMovie: word };
      },
      () => {}
    );
  };

  takeTab = (tab) => {
    this.setState(() => {
      return { activeTab: tab };
    });
  };

  onError = () => {
    this.setState({ error: true, movies: [], totalResults: 0 });
  };

  stateUpdate = (results, total_results, page) => {
    this.setState(() => {
      if (page === undefined) {
        return { movies: results, totalResults: total_results };
      } else {
        return { movies: results, totalResults: total_results, page: page };
      }
    });
  };

  componentDidMount() {
    this.movieService
      .getPopularTitles(this.state.page)
      .then((body) => {
        this.stateUpdate(body.results, body.total_results);
      })
      .catch(this.onError);
    this.movieService.getGenres().then((body) => {
      this.setState({ genres: body.genres });
    });

    this.movieService
      .createSession()
      .then((body) => {
        this.setState({ sessionId: body.guest_session_id });
      })
      .catch(this.onError);
  }

  setPage = (page) => {
    this.setState({ page: page });
  };

  render() {
    let list = [];

    if (this.state.movies === undefined || this.state.movies.length === 0) {
      list = <Alert message="Нет результатов удовлетворяющих вашему запросу" type="warning" />;
    } else {
      for (let i = 0; i < this.state.movies.length; i++) {
        list.push(
          <MovieItem
            i={i}
            key={this.state.movies[i].id}
            movie={this.state.movies[i]}
            sessionId={this.state.sessionId}
            movieId={this.state.movies[i].id}
          />
        );
      }
    }

    let search = null;
    if (this.state.activeTab === 'Search') {
      search = <MovieSearch takeSearchWord={this.takeSearchWord} />;
    }

    const content = this.state.error ? (
      <Alert message="Ошибка: включите VPN и перезагрузите страницу." type="error" />
    ) : (
      <div className="movie-app">{list}</div>
    );

    return (
      <div className="main">
        <Online>
          <GetSearchMovies
            searchMovie={this.state.searchMovie}
            activeTab={this.state.activeTab}
            stateUpdate={this.stateUpdate}
            page={this.state.page}
          />
          <GetRatedMovies
            activeTab={this.state.activeTab}
            stateUpdate={this.stateUpdate}
            page={this.state.page}
            sessionId={this.state.sessionId}
          />
          <Header takeTab={this.takeTab} />
          <MovieProvider value={{ genres: this.state.genres }}>
            {search}
            {content}
            <MoviePagination
              totalResults={this.state.totalResults}
              setPage={this.setPage}
              activePage={this.state.page}
            />
          </MovieProvider>
        </Online>
        <Offline>
          <Alert message="Отсутствует подключение к интернету" type="error" />
        </Offline>
      </div>
    );
  }
}

root.render(<MovieApp />);
