let db = require("./REVW-db");
let hash = require("./hashing.js");
let session = require("express-session");
let bcrypt = require('bcryptjs');
let logic = require("./logic");


async function  listAllUsers(request, response) {

    let users = await db.getUsers();
    response.setHeader("content-type", "text/json");
    response.send({"users": users});//generates json list of all users
}

async function pageHome(request, response) {
    let users = await db.getUsers(request.body.platform);
    let sess = request.session;
    let date = logic.newDate();

    response.render("home", {"users": users, "session": sess, "date": date});
}

async function pageGames(request, response) {
    let games = await db.getGames(request.body.platform);
    let sess = request.session;
    let date = logic.newDate();

    //gets url and values from url
    var url_string = request.protocol + '://' + request.get('host') + request.originalUrl;
    var url = new URL(url_string);
    var genre = url.searchParams.get("genre");
    var platform =  url.searchParams.get("platform");
    var other =  url.searchParams.get("other");

    var message = {
        genre : genre,
        platform : platform,
        other: other
    };

    //sort out games to only include what you need
    let sort = logic.sortGames(message, games);
    response.render("game", { "sort": sort, "games": games, "session": sess, "date": date, "url": message});
}

async function pageAdmin(request, response) {
    let users = await db.getUsers(request.body.userName);
    let sess = request.session;
    let date = logic.newDate();

    let user = users.toString();

    //For Adding User
    if (request.body.userName == null) {
        var messageData = {
            message : ("hidden"),
            class : "hidden"
        };
    }
    else if(user !== '') {
        var messageData = {
            message : ("Sorry this username has already been taken " + request.body.admin),
            class : "incorrect"
        };
    }
    else if (request.body.userPassword != request.body.userPassword2) {
        var messageData = {
            message: "Passwords are not the same please try again",
            class: "incorrect"
        };
    }
    else {
        var messageData = {
            message : (request.body.userName + " , has been added"),
            class : "correct"
        };
        admin = false;
        if (request.body.admin == "True") {admin = true;};

        //create hashed password and sends data to database
        let hashedPassword = await hash.hashPassword(request.body.userPassword);
        users = await db.postUser(request.body.userName, hashedPassword, admin);
    }

    //For Removing User
    if (request.body.deleteUser != null)
    {
        let users = await db.getUsers(request.body.deleteUser);
        let user = users.toString();

        if (user != '')  {
            var messageDataDelete = {
                message : (users[0].userName + " Has Been Deleted"),
                class : "correct"
            };
            await db.deleteUser(users[0].userName);
        }
        else {
            var messageDataDelete = {
                message : ("Sorry You have type the wrong name please try again"),
                class : "incorrect"
            };
        }
    }
    else {
        var messageDataDelete = {
            message : ("Hidden"),
            class : "hidden"
        };
    }

    //For Adding Game
    if (request.body.gameName != null) {
        let games = await db.getGames(request.body.gameName);
        let game = games.toString();

        if (game != '') {
            var messageDataGame = {
                message : ("Sorry game is already in database"),
                class : "incorrect"
            };
        }
        else {
            var messageDataGame = {
                message : (request.body.gameName + " Game has been added"),
                class : "correct"
            };

            //sends game infomation to dataabse
            await db.postGame(request.body.gameName,request.body.gamePlatform,request.body.gameGenre ,request.body.gameDescription, "0"
            ,request.body.gameRelease.toString(), request.body.gameImage);
        }
    }
    else {
        var messageDataGame = {
            message : ("Hidden"),
            class : "hidden"
        };
    }

    //For Removing Game
    if (request.body.deleteGame != null)
    {
        let games = await db.getGames(request.body.deleteGame);
        let game = games.toString();

        if (game != '')  {
            var messageDataDeleteGame = {
                message : (games[0].gameName + " Has Been Deleted"),
                class : "correct"
            };
            await db.deleteGame(games[0].gameName);
        }
        else {
            var messageDataDeleteGame = {
                message : ("Sorry You have type the wrong name please try again"),
                class : "incorrect"
            };
        }
    }
    else {
        var messageDataDeleteGame = {
            message : ("Hidden"),
            class : "hidden"
        };
    }

    games = await db.getGames(request.body.platform);
    users = await db.getUsers(request.body.platform);

    //gets statisiscs for admin page
    let statistics = logic.adminStatitics(users, games);

    response.render("admin", {"users": users,"games": games ,"session": sess, "date": date, "output": messageData,
        "outputDelete": messageDataDelete, "outputGame": messageDataGame,"outputDeleteGame": messageDataDeleteGame, "stats": statistics});
}

async function pageSignOut(request, response) {
    let users = await db.getUsers(request.body.platform);
    let sess = request.session;
    sess.user = 'none';
    sess.admin = false;
    sess.userID = 'none';

    request.session = sess;

    //will take user back to home page
    pageHome(request,response);
}

async function pageSignIn(request, response) {
    let users = await db.getUsers(request.body.userName);


    if (users.length == 0) {
        var messageData = {
            message : "Username or/and Password was incorrect please try again",
            class : "incorrect"
        };
    }
    else if(users.length == 1) {

        //checks if users input is the same as stored hashed password
        const check = await hash.comparePassword(request.body.userPassword, users[0].userPassword);

        if (check == true){
            let sess = request.session;
            sess.user = users[0].userName;
            sess.admin = users[0].admin;
            sess.userID = users[0]._id;

            var messageData = {
                message : ("Hello " + sess.user + " , Welcome back"),
                class : "correct"
            };
        }
        else {
            var messageData = {
                message : "Username or/and Password was incorrect please try again",
                class : "incorrect"
            };
        }
    }
    else {
        var messageData = {
            message : ("this is hiiden"),
            class : "hidden"
        };
    }

    response.render("sign-in", {"users": users,  "output": messageData});
}

async function pageSignUp(request, response) {
    let users = await db.getUsers(request.body.userName);
    let user = users.toString();

    if (request.body.userName == null) {
        var messageData = {
            message : ("hidden"),
            class : "hidden"
        };
    }
    else if(user !== '') {
        var messageData = {
            message : ("Sorry this username has already been taken "),
            class : "incorrect"
        };
    }
    else if (request.body.userPassword != request.body.userPassword2) {
        var messageData = {
            message: "Passwords are not the same please try again",
            class: "incorrect"
        };
    }
    else {
        var messageData = {
            message : ("Hello " + request.body.userName + " , You are now signed up"),
            class : "correct"
        };

        let hashedPassword = await hash.hashPassword(request.body.userPassword);
        users = await db.postUser(request.body.userName, hashedPassword, false);
    }
    response.render("sign-up", {"users": users, "output": messageData});
}

async function pageReview(request, response) {

    let date = logic.newDate();
    let sess = request.session;
    let games = await db.getGames(request.body.gameName);
    let game = games.toString();
    let reviews = await db.getReviews(games[0]._id);
    let gamescore = 0;



    if (request.body.UserID == null) {
        var message = {
            message : ("Hidden"),
            class : "hidden"
        };
    }
    else if ((request.body.UserID == '') || (request.body.UserID == "none")) {
        var message = {
            message : ("Sorry You Need To Log In to create a review"),
            class : "incorrect"
        };
    }
    else {

        let users = await db.getUsersID(request.body.UserID);

        //check if user has logged in before
        let reviewed = false;
        if (reviews) {
            reviewed = logic.checkUser(users[0]._id,reviews,);
        }

        if (reviewed == true) {
            var message = {
                message : ( " You have already submited a review " + users[0].userName),
                class : "incorrect"
            };
        }
        else {
            var message = {
                message : ( " Review Has Been Submited " + users[0].userName),
                class : "correct"
            };

            await db.postReview(request.body.GameID,games[0].gameName,request.body.UserID,users[0].userName, request.body.reviewScore , date, request.body.reviewDescription);
            let reviews = await db.getReviews(games[0]._id);
            gamescore = logic.newScore(reviews);

            await db.updateGame(gamescore, games[0].id);
        }
    }
    response.render("reviews", {"test": games[0].gameName, "games": games, "date": date,"session": sess, "output": message, "reviews": reviews})
}



async function pageProfile(request,response) {
    let sess = request.session;
    let users = await db.getUsers(sess.user);
    let date = logic.newDate();

    let userReviews = await db.getUserReviews(users[0].userName);

    response.render("profile", {"users": users, "sess": sess, "date": date, "reviews": userReviews});

}


module.exports.pageProfile = pageProfile;
module.exports.listAllUsers = listAllUsers;
module.exports.pageHome = pageHome;
module.exports.pageGames = pageGames;
module.exports.pageAdmin = pageAdmin;
module.exports.pageSignIn = pageSignIn;
module.exports.pageSignUp = pageSignUp;
module.exports.pageSignOut = pageSignOut;
module.exports.pageReview = pageReview;