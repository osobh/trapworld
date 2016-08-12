var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var request = require('request');
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* GET API Crime page. */
router.get('/crime', function(req, res) {
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var dayCrime = [];
            var correctUrl = JSON.parse(body);
            res.json(correctUrl)
          }
});
});

/* GET API Crime page. */
router.get('/crime/day', function(req, res) {
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    var storedJSON = {};
    
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var nightCrime = {}
            var correctUrl = JSON.parse(body);
            storedJSON = correctUrl;
          }
          // Sort through all the object data and keep only the incidents that happen at night
          var dayTimeCrime = []

          // Loop through all the storedJSON and pull out items to add to a new array
          for(var i = 0 ; i < storedJSON.length ; i++){
              var currentDayTimeCrime = storedJSON[i];
              var crimeTime =  currentDayTimeCrime.time.split(":")[0];
              //console.log(crimeTime);
              if(crimeTime <= 20 && crimeTime >= 6 ){
                var tmp = {}
                tmp.title = currentDayTimeCrime.category;
                tmp.location = { lat: parseFloat(currentDayTimeCrime.location.latitude), lng: parseFloat(currentDayTimeCrime.location.longitude)};
                dayTimeCrime.push(tmp);
              }
          };
          res.json(dayTimeCrime);
    });
});

router.get('/crime/night', function(req, res) {
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    var storedJSON = {};
    
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var nightCrime = {}
            var correctUrl = JSON.parse(body);
            storedJSON = correctUrl;
          }
          // Sort through all the object data and keep only the incidents that happen at night
          var nightTimeCrime =[]
         
          // Loop through all the storedJSON and pull out items to add to a new array
          for(var i = 0 ; i < storedJSON.length ; i++){
              var currentNightTimeCrime = storedJSON[i];
              var crimeTime =  currentNightTimeCrime.time.split(":")[0];
              if((crimeTime <= 24 &&  crimeTime >=20) || (crimeTime <= 6 && crimeTime >=0)){
                var tmp = {}
                tmp.title = currentNightTimeCrime.category;
                tmp.location = { lat: parseFloat(currentNightTimeCrime.location.latitude), lng: parseFloat(currentNightTimeCrime.location.longitude)};
                nightTimeCrime.push(tmp);
              }
          };
          res.json(nightTimeCrime);
    });
});




router.get('/path', function(req, res) {
    res.json({ message: 'hooray! welcome to our path api!' });   
});

module.exports = router;