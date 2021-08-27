const axios = require('axios');
const { notFoundHandler } = require('./notFoundHandler');

async function getMovies(req, res) {
  console.log(getMovies);
  const MoviesearchQuery = req.query.searchQuery;
  const MoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&query=${MoviesearchQuery}&page=1&include_adult=false`;
  
  try{
    // const topMovies = data.data.results
    const MovieResponse = await axios.get(MoviesUrl);
    console.log(MovieResponse);
    const SortedMovieData = MovieResponse.data.results.sort((a, b) => b.popularity - a.popularity);
    const movieData = SortedMovieData.map(movies => new Movies(movies));
    res.send(movieData);
  }catch(error){
    console.log(error);
    notFoundHandler();
  }

}
class Movies {
  constructor(object) {
    this.title = object.title,
    this.overView = object.overView,
    this.popularity = object.popularity,
    this.poster = `https://image.tmdb.org/t/p/w500` + `${object.poster_path}`,
    this.date = object.release_date,
    this.averageVotes = object.vote_average,
    this.totalVotes = object.vote_count;
  }
}

module.exports = {
  getMovies: getMovies
}