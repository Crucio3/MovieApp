export default class MovieService {
  _apiKey = '118edcf398c27407c49dd8bf9b6d674a';
  async getPopularTitles(page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this._apiKey}&language=en-US&page=${page}`
    );
    return await res.json();
  }

  async searchTitle(page = 1, movie) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${this._apiKey}&language=en-US&page=${page}`
    );
    return await res.json();
  }

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=en`);
    return await res.json();
  }

  async createSession() {
    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._apiKey}`);
    return await res.json();
  }

  async rateMovie(rate, movieId, guestSessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rate }),
      }
    );
    return await res.json();
  }

  async ratedList(guestSessionId, page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}`
    );

    return await res.json();
  }
}
