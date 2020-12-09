let db = require("./REVW-db");
let hash = require("./hashing.js");
let session = require("express-session");
let bcrypt = require('bcrypt');

async function  listAllUsers(request, response) {

    let users = await db.getUsers();
    response.setHeader("content-type", "text/json");
    response.send({"users": users});
}

async function pageHome(request, response) {
    let users = await db.getUsers(request.body.platform);
    let sess = request.session;

    response.render("home", {"users": users, "session": sess});
}

async function pageSignOut(request, response) {
    let users = await db.getUsers(request.body.platform);
    let sess = request.session;
    sess.user = 'none';
    sess.admin = false;

    request.session = sess;

    pageHome(request,response);

 //   response.render("home", {"users": users, "session": sess});
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

        const check = await hash.comparePassword(request.body.userPassword, users[0].userPassword);
       // let check = bcrypt.compare(request.body.userPassword, users[0].userPassword, function (err,result) {
       //     return result;
       // });

        if (check == true){
            let sess = request.session;
            sess.user = users[0].userName;
            sess.admin = users[0].admin;

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



module.exports.listAllUsers = listAllUsers;
module.exports.pageHome = pageHome;
module.exports.pageSignIn = pageSignIn;
module.exports.pageSignUp = pageSignUp;
module.exports.pageSignOut = pageSignOut;