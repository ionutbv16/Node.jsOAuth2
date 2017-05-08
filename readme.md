# OAuth2 Demo by Ion Chirita

A Node.js app

Coding Test - Fullstack JavaScript Developer
Story: As a user, I want to login and view my user profile.
## Running Locally

Make sure you have [Node.js](http://nodejs.org/)  installed.

- copy the zip file into a folder
- open cmd line into the folder
- npm install 
- node server

Your app should now be running on [localhost:3000](http://localhost:3000).


- open the file in browser http://localhost:3000/welcome


 



# OAuth2 Demo by Ion Chirita

Technical Aproaches
---------------------------------------
After server is started, open the browser on http://localhost:3000/welcome
---------------------------------------

1. The app is using multiple dependencies including 

"path": "*",
    "body-parser": "*",
 "express": "*",
    "express-handlebars": "*",
  "express-passport-logout": "^0.1.0",
    "express-session": "*",
  "passport": "*",
    "passport-http": "*",
     "passport-local": "*",
    "passport-oauth2": "*",
    "express-passport-logout": "*"


2. Express-handlebars contained in:

 - views folder: 
	- layouts folder: layout.handlebars - main file for the handlebar


3. 5 Routes created

	app.use('/', routes);
	app.use('/welcome', welcome);
	app.use('/bye', bye);
	app.use('/welcomenotlogin', welcomenotlogin);
	app.use('/users', users);


4. OAuth2 and passport.js 

   Passport.js init procedure in server.js main project file 

   // Passport init
   app.use(passport.initialize());
   app.use(passport.session());

   At '/' route (http://localhost:3000) the passport-oauth2 process is triggered
   
   routes/index.js 
   I am using OAuth2Strategy with the given settings, then i get the accessToken 
   
   redirect to login screen by passing the accessToken as a parameter in the URL 
   res.redirect("/users/login?accessToken="+ globalaccessToken);
   
   Users.js Get the user profile by given settings using the token from the URL query string
   var accessToken = req.query.accessToken;

   simple get request with the token in the Authorization header
   https.get(options, function(res){

   With the response: res.render('login'  - screen

5. Logout Button - redirect to http://localhost:3000/logout  
   Destroy the session , then redirect 
   req.session.destroy(function (err) {
    res.redirect('/bye');
    });

6. Check if user  isAuthenticated 
   welcome.js 
   If yes, show a welcome screen
   If not, redirect to    /welcomenotlogin 
   
7. custom jQuery plugin : Included in My Account User profile.
	
   It's a Data Tab

   public\css\my_jquery_plugin.css
   public\js\my_jquery_plugin.js