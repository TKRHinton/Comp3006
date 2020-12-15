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
    admin: false,
    userID: 'none'
}));

// Set up the static files.
app.use(express.static(path.join(__dirname, "files")));

// Setup the app to use EJS templates.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Enable processing of post forms.
app.use(express.urlencoded({extended: true}));

app.get("/flip", routes.coinFlipRoute);
app.get("/sum", routes.sumNumbers);

module.exports.app = app;

app.get("/users", routes.listAllUsers);
app.get("/home", routes.pageHome);
app.get("/admin", routes.pageAdmin);
app.get("/signIn", routes.pageSignIn);
app.get("/signUp", routes.pageSignUp);
app.get("/signOut", routes.pageSignOut);
app.get("/games", routes.pageGames);

app.post('/review', routes.pageReview);
app.post('/signInAttempt', routes.pageSignIn);
app.post('/signUpAttempt', routes.pageSignUp);
app.post('/adminRequest', routes.pageAdmin);


//listens on port 9000
var server = app.listen(port, function() {
    console.log("Listening on " + port);
})

function close() {
    server.close(function () {
        console.log("Server Closing");
    });
};

close();
