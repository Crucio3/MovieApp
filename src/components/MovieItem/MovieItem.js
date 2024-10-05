import React, { Component } from 'react';
import { format } from 'date-fns';

import './MovieItem.css';

import MovieService from '../../service/MovieService/MovieService';

export default class MovieItem extends Component {
  movieService = new MovieService();

  state = {
    image: null,
    name: null,
    date: null,
    genres: null,
    description: null,
  };

  updateMovies() {
    this.movieService.getTitles().then((body) => {
      console.log(body.results);
      this.setState({
        image: `https://image.tmdb.org/t/p/original${body.results[4].poster_path}`,
        name: body.results[4].title,
        date: format(body.results[4].release_date, 'MMMM d, yyyy'),
        description: body.results[2].overview,
      });
    });
  }

  componentDidMount() {
    this.updateMovies();
  }

  render() {
    const { image, name, date, description } = this.state;

    return (
      <div className="movie-item">
        <div className="movie-item__img-container">
          <img src={image} className="movie-item__img" alt=""></img>
        </div>
        <div className="movie-item__inform">
          <div className="movie-item__name">{name}</div>
          <div className="movie-item__date">{date}</div>
          <div className="movie-item__genres">Здесь заглушка</div>
          <div className="movie-item__description">{description}</div>
        </div>
      </div>
    );
  }
}
