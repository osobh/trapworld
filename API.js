'use strict';
// This block will grab the json file of all the data from the API and 
var request = require('request');
request('https://data.sfgov.org/resource/9v2m-8wqu.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      console.log(info.category);
    }
})