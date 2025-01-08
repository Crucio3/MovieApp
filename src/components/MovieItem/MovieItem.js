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
    loadingImage: true,
  };

  updateMovies = () => {
    this.movieService.getPopularTitles().then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  loadingImage = () => {
    this.setState({ loadingImage: false });
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

  rate = (value) => {
    const { sessionId, movieId } = this.props;
    this.movieService.rateMovie(value, movieId, sessionId);
  };

  componentDidMount() {
    this.updateMovies();
  }

  render() {
    const { loading, loadingImage } = this.state;
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

    let inform = null;

    const spinerImage = loadingImage ? <Spin></Spin> : null;

    let imageSrc;

    if (movie.poster_path === null) {
      imageSrc =
        'https://imgholder.ru/240x364/8493a8/adb9ca&text=%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8+%D0%BD%D0%B5%D1%82&font=kelson';
    } else {
      imageSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    }

    if (!loading && window.innerWidth >= 768) {
      inform = (
        <Fragment>
          <div className="movie-item__img-container">
            {spinerImage}
            <img
              src={imageSrc}
              className="movie-item__img"
              alt=""
              onLoad={this.loadingImage}
              style={loadingImage ? { display: 'none' } : { display: 'block' }}
            ></img>
          </div>
          <div className="movie-item__inform">
            <div className="movie-item__name">{movie.title}</div>
            <div className="movie-item__date">{date}</div>
            <div className="movie-item__genres">{this.getGenres()}</div>
            <div className="movie-item__description">{overview}</div>
            <Rate className="movie-item__rate" count={10} onChange={this.rate} />
            <div className="movie-item__rating" style={styles}>
              {Number(movie.vote_average.toFixed(1))}
            </div>
          </div>
        </Fragment>
      );
    } else if (!loading && window.innerWidth < 768) {
      inform = (
        <Fragment>
          <div className="movie-item__mobile-position">
            <div className="movie-item__img-container">
              <img src={imageSrc} className="movie-item__img" alt="" />
            </div>
            <div className="movie-item__inform">
              <div className="movie-item__name">{movie.title}</div>
              <div className="movie-item__date">{date}</div>
              <div className="movie-item__genres">{this.getGenres()}</div>
              <div className="movie-item__rating" style={styles}>
                {Number(movie.vote_average.toFixed(1))}
              </div>
            </div>
          </div>
          <div className="movie-item__description">{overview}</div>
          <Rate className="movie-item__rate" count={10} onChange={this.rate} />
        </Fragment>
      );
    } else {
      inform = null;
    }

    return (
      <div className="movie-item">
        {spinner}
        {inform}
      </div>
    );
  }
}
