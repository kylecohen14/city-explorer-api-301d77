'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
// const { default: axios } = require('axios');
const { getWeather } = require('./mod routes/weatherAPI');
const { getMovies } = require('./mod routes/moviesAPI');
// const { notFoundHandler } = require('./mod routes/notFoundHandler');
dotenv.config();
app.use(cors());
// app.use(express.json());

const PORT = process.env.PORT || 3001;
app.get('/weather', getWeather);
app.get('/movies', getMovies);
// app.get('*', notFoundHandler);


app.listen(PORT, () => console.log(`listening port ${PORT}`))