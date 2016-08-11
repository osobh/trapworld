var express = require('express');
var router = express.Router();
var request = require('request');

/* GET API Crime page. */
router.get('/crime', function(req, res) {
    var info = [];
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body)
            var nightCrime = [];
            var dayCrime = [];
            for(var i = 0 ; i < body.length ; i++){
                var newData = (body[i]);
                for(var key in newData) {
                  var obj = newData[key];
                  var crimeTime = obj.time;
                  var crimeCategory = obj.category;
                  res.json(JSON.parse(crimeCategory)); 
                    // info.push(JSON.parse(body));
                  }
            }
        }
    });
});

router.get('/path', function(req, res) {
    res.json({ message: 'hooray! welcome to our path api!' });   
});


module.exports = router;
