'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
// const weatherData = require('./data/weather.json');
const { default: axios } = require('axios');

dotenv.config();
app.use(cors());
// app.use(express.json());

const PORT = process.env.PORT || 3001;



app.get('/weather', getWeather);

async function getWeather(req, res) {
  console.log(req.query);
  const lat = req.query.lat;
  const lon =req.query.lon;
  const searchQuery = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API}&city=${searchQuery}&days=5`;
  // &lat=${lat}&lon=${lon}
  try{
    const response = await axios.get(url);
    console.log(response);
    const APIforecastArray = response.data.data.map(day => new Forecast(day));
    res.send(APIforecastArray);
    // const forecast = cityObject.data.map(day => new Forecast(day));
    // res.send(forecast);
  }catch(error){
    console.log(error);
    notFoundHandler();
  }

}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.low_temp = day.low_temp;
    this.max_temp = day.max_temp;
  }
}


app.get('/movies', getMovies);

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





app.get('*', notFoundHandler);

function notFoundHandler(req, res) {
  res.status(500).send('not here! Go somewhere else 500')
}

// app.get('*', (req, res) => {
//   res.status(500).send('not found 500');
// });

app.listen(PORT, () => console.log(`listening port ${PORT}`))