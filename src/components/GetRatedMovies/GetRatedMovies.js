import { Component } from 'react';

import MovieService from '../../service/MovieService/MovieService.js';

export default class GetRatedMovies extends Component {
  movieService = new MovieService();

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      if (this.props.activeTab === 'Rated') {
        this.movieService
          .ratedList(this.props.sessionId, this.props.page)
          .then((body) => {
            this.props.stateUpdate(body.results, body.total_results);
          })
          .catch(this.props.onError);
      }
    }

    if (prevProps.activeTab !== this.props.activeTab && this.props.activeTab === 'Rated') {
      this.movieService
        .ratedList(this.props.sessionId, 1)
        .then((body) => {
          this.props.stateUpdate(body.results, body.total_results, 1);
        })
        .catch(this.props.onError);
    }

    if (prevProps.activeTab !== this.props.activeTab && this.props.activeTab === 'Search') {
      this.movieService
        .getPopularTitles(1)
        .then((body) => {
          this.props.stateUpdate(body.results, body.total_results);
        })
        .catch(this.props.onError);
    }
  }

  render() {
    return null;
  }
}
