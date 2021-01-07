let models = require("./REVW-schema");

async function getUsers(username) {

    let filter = {};
    if (username)
    {
        filter.userName = username;
    }
    return await models.User.find(filter);
}

async function getGames(gamename) {
    let filter = {};
    if (gamename)
    {
        filter.gameName = gamename;
    }
    return await models.Game.find(filter);
}

async function getUsersID(ID) {
    let filter = {};
    if (ID)
    {
        filter._id = ID;
    }
    return await models.User.find(filter);
}

async function getUsersInfo(username, password) {

    let filter = {};
    if (username)
    {
        filter.userName = username;
        filter.userPassword = password;
    }
    return await models.User.find(filter);
}

async function postUser(username, password, admin) {

    let filter = {};
    if (username)
    {
        filter.userName = username;
        filter.userPassword = password;
    }

     await models.User.create({userName: username, userPassword: password, admin: admin});

    return await models.User.find(filter);
}

async function deleteUser(username) {
    await models.User.deleteOne ({userName: username});
}

async function postReview(gameid, gamename,userid, username, score, date, description) {
    await models.Review.create({gameID: gameid, gameName: gamename,userID: userid, userName: username, reviewScore: score, reviewDate: date , reviewDescription: description})
}

async function updateGame(gamescore, id) {
    await models.Game.updateOne({_id: id}, {$set: {gameScore: gamescore}})
}

async function postGame(gamename, gameplatform,gamegenre, gamedescription, gamescore, gamerelease, gameimage) {

    await models.Game.create({gameName: gamename, gamePlatform: gameplatform,gameGenre: gamegenre, gameDescription: gamedescription,
        gameScore: gamescore, gameRelease: gamerelease, gameImage: gameimage});
}

async  function deleteGame(gamename) {
    await models.Game.deleteOne ({gameName: gamename});
}

async  function deleteReview(id) {
    await models.Review.deleteOne ({_id: id});

}

async function getReviews(ID) {
    let filter = {};
    if (ID)
    {
        filter.gameID = ID;
    }
    return await models.Review.find(filter);
}

async function  getUserReviews(username) {
    let filter = {};
    if (username)
    {
        filter.userName = username;
    }
    return await models.Review.find(filter);
}

module.exports.deleteReview = deleteReview;
module.exports.getUserReviews = getUserReviews;
module.exports.updateGame = updateGame;
module.exports.getReviews = getReviews;
module.exports.getUsers = getUsers;
module.exports.getUsersID = getUsersID;
module.exports.getUsersInfo = getUsersInfo;
module.exports.postUser = postUser;
module.exports.deleteUser = deleteUser;
module.exports.postGame = postGame;
module.exports.deleteGame = deleteGame;
module.exports.getGames = getGames;
module.exports.postReview = postReview;
