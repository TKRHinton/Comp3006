//get required add ons
let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let routes = require("./REVW-routes");
let session = require("express-session");



//connection to the db
let url = "mongodb://localhost:27017/revwdb";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
let port = 9000;

// Initialise the app.
app = express();

app.use(session({
    secret: "UserLog",
    resave: true,
    saveUninitialized: true,
   // cookie: { user: 'none', admin: 'none'}
    user: 'none',
    admin: false
}));

// Set up the static files.
app.use(express.static(path.join(__dirname, "files")));

// Setup the app to use EJS templates.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Enable processing of post forms.
app.use(express.urlencoded({extended: true}));

app.get("/users", routes.listAllUsers);
app.get("/home", routes.pageHome);
app.get("/signIn", routes.pageSignIn);
app.get("/signUp", routes.pageSignUp);
app.get("/signOut", routes.pageSignOut);

app.post('/signInAttempt', routes.pageSignIn);
app.post('/signUpAttempt', routes.pageSignUp);


//listens on port 9000
app.listen(port, function() {
    console.log("Listening on " + port);
})