var express = require('express');
var router = express.Router();
var request = require('request');

/* GET API Crime page. */
router.get('/crime', function(req, res) {
    var info = [];
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //console.log(body)
            var newBody = JSON.parse(body);
            res.json(newBody);
            // console.log(newBody);
            var nightCrime = [];
            var dayCrime = [];
            
            //console.log(dayCrime);
        }
    });
});

router.get('/path', function(req, res) {
    res.json({ message: 'hooray! welcome to our path api!' });   
});


module.exports = router;