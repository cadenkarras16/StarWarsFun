let express = require("express");

let app = express(); 

let path = require("path");

app.set("view engine", "ejs");

const swapi = require('swapi-node');

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
    //typeNumber = Math.floor(Math.random() * 5);
    let type = data[typeNumber]


    if (type == "planets")
    {
        apiNumber = Math.floor(Math.random() * 61);
    } 
    else if (type == "starships")
    {
        apiNumber = Math.floor(Math.random() * 5) + 9;
    }
    else if (type == "people")
    {
        //errors happen on the following numbers from the API: 17, 
        //I have only gone up to 50 as of April 27th ^^
        //apiNumber = Math.floor(Math.random() * 84);
        if (apiNumber == 17) {
            apiNumber = 1
        }
    }
    else if (type == "films")
    {
        apiNumber = Math.floor(Math.random() * 6) + 1;
    }
    else if(type == "species")
    {
        apiNumber = Math.floor(Math.random() * 37) + 1;
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

    //
    swapi.get('https://swapi.dev/api/' + type + '/' + apiNumber ).then(result => {
        res.render("index", {aStarWars: result, data: type, characterId: apiNumber}, );
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.listen(3000, () =>
  console.log("Express App has started and server is listening!")
);