import { Component } from 'react';

import MovieService from '../../service/MovieService/MovieService.js';

export default class GetSearchMovies extends Component {
  movieService = new MovieService();

  componentDidUpdate(prevProps) {
    if (prevProps.searchMovie !== this.props.searchMovie) {
      this.movieService.searchTitle(1, this.props.searchMovie).then((body) => {
        this.props.stateUpdate(body.results, body.total_results, 1);
      });
    }

    if (prevProps.page !== this.props.page) {
      if (this.props.searchMovie === '' && this.props.activeTab === 'Search') {
        window.scrollTo(0, 0);
        this.movieService
          .getPopularTitles(this.props.page)
          .then((body) => {
            this.props.stateUpdate(body.results, body.total_results);
          })
          .catch(this.props.onError);
      } else if (this.props.searchMovie !== '' && this.props.activeTab === 'Search') {
        this.movieService
          .searchTitle(this.props.page, this.props.searchMovie)
          .then((body) => {
            this.props.stateUpdate(body.results, body.total_results);
          })
          .catch(this.props.onError);
      }
    }
  }

  render() {
    return null;
  }
}
