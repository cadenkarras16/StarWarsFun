const swapi = require('swapi-node');

for (let i = 1; i < 84; i++) {
    swapi.get('https://swapi.dev/api/people/' + i).then((result) => {
        console.log(i + '    ' + result.name);
     });
  }

