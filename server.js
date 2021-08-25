'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();

dotenv.config();
app.use(cors());
// do i need use(express.json)?



const PORT = process.env.PORT || 3001;

app.get('/weather', (req, res) => {
  console.log(req.query);
  const lat = req.query.lat;
  const lon =req.query.lon;
  const searchQuery = req.query.searchQuery;
  const city = new Forecast(weatherData.find (city => city_name.toLowerCase() === searchQuery.toLowerCase()))

  class Forecast {
    constructor(description, date) {
      this.description = description;
      this.date = date;
      forecastArray = []
    }
  }
  // res(200).send(city.forcastArray);
  // res.send([lat, lon, searchQuery]);
  let forecastArray = [];
  city.data.map( (value, idx) => {
    forecastArray.push(new Forecast(value.datetime, `Low of ${value.low_temp}, high of ${value.high_temp}, with ${value.weather.description}`));
  })
  res.send(forecastArray);
});

app.get('*', (req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => console.log(`listening port ${PORT}`))