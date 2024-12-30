export default class MovieService {
  _apiKey = '118edcf398c27407c49dd8bf9b6d674a';
  async getPopularTitles(page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this._apiKey}&language=ru-US&page=${page}`
    );
    return await res.json();
  }

  async searchTitle(page = 1, movie) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${this._apiKey}&language=ru-US&page=${page}`
    );
    return await res.json();
  }

  async getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=ru`);
    return await res.json();
  }
}
