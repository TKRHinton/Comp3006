//get required add ons
let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let routes = require("./REVW-routes");
let session = require("express-session");
let socketIo = require("socket.io");
let http = require("http");

//connection to the db
let url = "mongodb://localhost:27017/revwdb";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
let port = 9000;

// Initialise the app.
app = express();

//set up socket io
server = http.createServer(app);

//cookie to store user when they log in
app.use(session({
    secret: "UserLog",
    resave: true,
    saveUninitialized: true,
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

//socket io for chat feature
let io = socketIo(server);
io.on("connection", function(socket) {

    socket.on("send message", function(msg) {

        socket.broadcast.emit("received message", msg);

    });

});


module.exports.app = app;

app.get("/adminChat", routes.pagechat);
app.get("/users", routes.listAllUsers);
app.get("/home", routes.pageHome);
app.get("/admin", routes.pageAdmin);
app.get("/signIn", routes.pageSignIn);
app.get("/signUp", routes.pageSignUp);
app.get("/signOut", routes.pageSignOut);
app.get("/games", routes.pageGames);
app.get("/profile", routes.pageProfile);


app.post('/profileDelete', routes.pageProfile);
app.post('/review', routes.pageReview);
app.post('/reviewRequest', routes.pageReview);
app.post('/signInAttempt', routes.pageSignIn);
app.post('/signUpAttempt', routes.pageSignUp);
app.post('/adminRequest', routes.pageAdmin);

//listens on port 9000
server.listen(9000, function() {
    console.log("Listening on 9000");
})
