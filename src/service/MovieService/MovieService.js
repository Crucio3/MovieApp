export default class MovieService {
  _apiKey = '118edcf398c27407c49dd8bf9b6d674a';
  async getTitles() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this._apiKey}&language=ru-US&page=1`);
    return await res.json();
  }
}
