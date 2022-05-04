let express = require("express");

let app = express(); 

let path = require("path");

app.set("view engine", "ejs");

const swapi = require('swapi-node');
//below helps with the weather API
const axios = require('axios');

app.use(express.static(__dirname+'/public'));

//swapi.get('https://swapi.dev/api/starships/9').then((result) => {
//    console.log(result);
//});

app.get("/", (req, res) => {

    //this is the random number for the value inside the type of variables we are pulling
    //let apiNumber = Math.floor(Math.random() * 84);
    let apiNumber = 1;
    
    let typeNumber = 2;

//Commented out below for testing with only people purposes

    let data = ["planets","starships", "people", "films", "species"]
    typeNumber = Math.floor(Math.random() * 5);
    let type = data[typeNumber]


    if (type == "planets")
    {
        //The total number of facts about planets is 60
        apiNumber = Math.floor(Math.random() * 60) + 1;
    } 
    else if (type == "starships")
    {
        //the number of facts for starships is 9 - 13
        apiNumber = Math.floor(Math.random() * 5) + 9;
    }
    else if (type == "people")
    {
        //errors happen on the following numbers from the API: 17, 
        //I have only gone up to 50 as of April 27th ^^
        //the total number of people facts is 83
        apiNumber = Math.floor(Math.random() * 9) + 1;
        if (apiNumber == 17) {
            apiNumber = 1
        }
    }
    else if (type == "films")
    {
        //the total number of films is 6
        apiNumber = Math.floor(Math.random() * 6) + 1;
    }
    else if(type == "species")
    {
        //the total number of species is 36
        apiNumber = Math.floor(Math.random() * 36) + 1;
    }

    // switch (type)
    // {
    //     case "planets":
    //         apiNumber = Math.floor(Math.random() * 61);

    //     case "starships":
    //         // Only 9 - 13 works for the API calls.
    //         // Don't know why the other ones don't work
    //         apiNumber = Math.floor(Math.random() * 5) + 9;
    //     case "people":
    //         apiNumber = Math.floor(Math.random() * 84);

    //     case "films":
    //         apiNumber = Math.floor(Math.random() * 7);

    //     case "species":
    //         apiNumber = Math.floor(Math.random() * 38);
    // }

    console.log(type + apiNumber);

    axios.get('https://api.open-meteo.com/v1/forecast?latitude=40.25&longitude=-111.66&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver').
    then(weatherResult => {weatherResult});


    swapi.get('https://swapi.dev/api/' + type + '/' + apiNumber ).then(result => {
        res.render("index", {aStarWars: result, data: type, characterId: apiNumber});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.listen(3000, () =>
  console.log("Express App has started and server is listening!")
);







//https://api.open-meteo.com/v1/forecast?latitude=40.25&longitude=-111.66&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver