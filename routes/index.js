var express = require ("express");
var router = express.Router();
var passport = require ('passport');
var OAuth2Strategy = require ('passport-oauth2');
const https = require('https');

var globalaccessToken = "";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('authz', new OAuth2Strategy({
    authorizationURL: 'https://staging-auth.wallstreetdocs.com/oauth/authorize',
    tokenURL: 'https://staging-auth.wallstreetdocs.com/oauth/token',
    clientID: 'coding_test',
    clientSecret: 'bwZm5XC6HTlr3fcdzRnD',
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log (" accessToken "+ accessToken);
    globalaccessToken = accessToken;
    return done(null, {
                accessToken: accessToken
            });

  }
));


router.get('/',  passport.authenticate('authz'), function (req, res) {
    console.log("passport.authenticate"+globalaccessToken);
    res.redirect("/users/login?accessToken="+ globalaccessToken);

}) ;

module.exports = router;
