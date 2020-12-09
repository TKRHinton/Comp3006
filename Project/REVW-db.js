let models = require("./REVW-schema");

async function getUsers(username) {

    let filter = {};
    if (username)
    {
        filter.userName = username;
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

module.exports.getUsers = getUsers;
module.exports.getUsersInfo = getUsersInfo;
module.exports.postUser = postUser;