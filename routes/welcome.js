var express = require ("express");
var router = express.Router();


function ensureAuthenticated(req, res, next){
 if(req.isAuthenticated()){
    console.log(" You are logged in " );
   return next();
 } else {
   //req.flash('error_msg','You are not logged in');
    console.log(" You are not logged in " );

   res.redirect('/welcomenotlogin');
 }
}




router.get('/', ensureAuthenticated,   function (req, res) {
  res.render('welcome');

});

module.exports = router;
