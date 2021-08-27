// 'use strict';

// const axios = require('axios');

// async function getAPIWeather(req, res) {
//   console.log(req.query);
//   const lat = req.query.lat;
//   const lon =req.query.lon;
//   const searchQuery = req.query.searchQuery;
//   const weatherAPIdata = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API}&city=${searchQuery}&lat=${lat}&lon=${lon}`;
//   // const cityObject = weatherData.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
//   // const cityObject = weatherAPIdata.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
//   try{
//     const apiforecast = axios.get(weatherAPIdata);
//     let apiforecastArray = [];
//     apiforecast.data.data.map( (value, idx) => {
//       apiforecastArray.push(new Forecast(value.datetime, `Avg temp of ${value.temp}, and ${value.weather.description}`));
//     });
//     res.status(200).send(apiforecastArray);
//     // const forecast = cityObject.data.map(day => new Forecast(day));
//     // res.send(forecast);
//   }catch(error){
//     console.log(error);
//     notFoundHandler();
//   }

// }