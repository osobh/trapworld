var express = require('express');
var router = express.Router();
var request = require('request');

/* GET API Crime page. */
router.get('/crime', function(req, res) {
    var dataUrl = 'https://data.sfgov.org/resource/9v2m-8wqu.json';
    var info = [];
    
    request(dataUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            info.push(JSON.parse(body));
            console.log("We are Pushing to info", info)
          }
    });
    res.json(info);
});

router.get('/path', function(req, res) {
    res.json({ message: 'hooray! welcome to our path api!' });   
});


module.exports = router;
