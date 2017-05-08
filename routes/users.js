var express = require ("express");
var router = express.Router();
const https = require('https');

router.get('/login', function (req, res) {
  // Get accessToken from URL
  var accessToken = req.query.accessToken;
  console.log(" -- users.js accessToken "+accessToken);
  var options =
  {
      host: "staging-auth.wallstreetdocs.com",
      path: "/oauth/userinfo",
      method: 'GET',
      headers:
      {
          Authorization: "Bearer "+accessToken
      }

  };

  var getResponse = {};
  https.get(options, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){

          console.log(body);
          getResponse = JSON.parse(body);

      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });


  setTimeout( function () {

    if (getResponse) {
         res.render('login',{
            data:getResponse
          });
    }
  }, 1000);


});


module.exports = router;
