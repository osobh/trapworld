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
            for(var key in correctUrl){
            dayCrime.push(correctUrl);
            }
            //console.log(dayCrime)
            for(var i = 0 ; i < dayCrime.length; i++){
                for(var key in dayCrime) {
                  var obj = dayCrime[key];
                    
                  var crimeCategory = obj.category;
                  console.log(obj.date);
                }
            }
          }
});
});

router.get('/path', function(req, res) {
    res.json({ message: 'hooray! welcome to our path api!' });   
});


module.exports = router;
