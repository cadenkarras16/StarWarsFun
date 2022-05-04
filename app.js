const res = require("express/lib/response");

const axios = require('axios');

axios.get('https://api.open-meteo.com/v1/forecast?latitude=40.25&longitude=-111.66&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver').
then(weatherResult => {
    res.render("weather", weatherResult)
});