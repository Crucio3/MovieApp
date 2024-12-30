import React, { Component, Fragment } from 'react';
import { format } from 'date-fns';
import { Spin, Rate } from 'antd';

import './MovieItem.css';

import MovieService from '../../service/MovieService/MovieService.js';
import { MovieConsumer } from '../MovieContext/MovieContext.js';

export default class MovieItem extends Component {
  movieService = new MovieService();

  state = {
    loading: true,
  };

  updateMovies = () => {
    this.movieService.getPopularTitles().then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  formatDate = (date) => {
    if (!date) {
      return 'Дата не указана';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };

  truncateText(text, maxLength) {
    if (text.length > maxLength) {
      let truncated = text.substring(0, maxLength);
      return truncated.substring(0, truncated.lastIndexOf(' ')) + '...';
    }
    return text;
  }

  getGenres = () => {
    return (
      <MovieConsumer>
        {({ genres }) => {
          const { movie } = this.props;
          const list = movie.genre_ids.map((id) => {
            const genre = genres.find((item) => item.id === id);
            return (
              <span className="movie-item__genre" key={id}>
                {genre.name}
              </span>
            );
          });

          return <span>{list}</span>;
        }}
      </MovieConsumer>
    );
  };

  componentDidMount() {
    this.updateMovies();
  }

  render() {
    const { loading } = this.state;
    const { movie } = this.props;

    if (!movie) {
      return null;
    }

    let date = this.formatDate(movie.release_date);
    let overview = this.truncateText(movie.overview, 155);

    const rating = movie.vote_average;

    let styles = {};

    if (rating < 3) {
      styles = {
        border: '2px solid #E90000',
      };
    } else if (rating >= 3 && rating < 5) {
      styles = {
        border: '2px solid #E97E00',
      };
    } else if (rating >= 5 && rating < 7) {
      styles = {
        border: '2px solid #E9D100',
      };
    } else {
      styles = {
        border: '2px solid #66E900',
      };
    }

    const spinner = loading ? (
      <div className="movie-item__loading">
        <Spin></Spin>
      </div>
    ) : null;

    const inform = !loading ? (
      <Fragment>
        <div className="movie-item__img-container">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="movie-item__img" alt=""></img>
        </div>
        <div className="movie-item__inform">
          <div className="movie-item__name">{movie.title}</div>
          <div className="movie-item__date">{date}</div>
          <div className="movie-item__genres">{this.getGenres()}</div>
          <div className="movie-item__description">{overview}</div>
          <Rate className="movie-item__rate" count={10} />
          <div className="movie-item__rating" style={styles}>
            {movie.vote_average}
          </div>
        </div>
      </Fragment>
    ) : null;

    return (
      <div className="movie-item">
        {spinner}
        {inform}
      </div>
    );
  }
}
