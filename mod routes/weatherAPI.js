const axios = require('axios');
const { notFoundHandler } = require('./notFoundHandler');


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
module.exports = {
  getWeather: getWeather
}