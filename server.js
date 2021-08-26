'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/weather', (req, res) => {
  console.log(req.query);
  const lat = req.query.lat;
  const lon =req.query.lon;
  const searchQuery = req.query.searchQuery;
  const cityObject = weatherData.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  try{
    const forecast = cityObject.data.map(day => new Forecast(day));
    res.send(forecast);
  }catch(error){
    console.log(error);
    notFoundHandler();
  }

});
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.low_temp = day.low_temp;
    this.max_temp = day.max_temp;
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