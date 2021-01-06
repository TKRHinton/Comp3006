
//creates current date
function newDate() {
    let fulldate = new Date();//gets full current date
    let day = fulldate.getDate();
    let month = fulldate.getMonth() + 1;

    if (month < 10)
    {
        month = "0" + month;
    }


    if (day < 10)
    {
        day = "0" + day;
    }
    let date = fulldate.getFullYear() + "-" + month + "-" + day;
    return date;
}

//generates admin statisics
function adminStatitics(Users, Games)
{
    let userNumber = 0;
    let adminNumber = 0;
    let gameNumber = 0;
    let lengthNum = 0;

    for (i=0; i<Users.length; i++) {
        userNumber++;

        if (Users[i].admin == true) {
            adminNumber++;
        }

        lengthNum += Users[i].userName.length;

    }

    //math to cal average length of username
    lengthNum = lengthNum / userNumber;
    lengthNum = Math.round(lengthNum * 100) / 100;

    for (i=0; i<Games.length; i++) {
        gameNumber++;
    }

    //creates array to return
    var message = {
        userNum : userNumber,
        lenNum : lengthNum,
        adminNum : adminNumber,
        gameNum : gameNumber
    };

    return message;
}

//generates game array including only selected genre/platform
function sortGames(message, games) {

    let sort = [];

    if (message.other != 'Null')
    {
        return games;
    }

    //if genre was selected
    if (message.genre != 'Null') {

        for (i=0; i<games.length; i++) {

            if (message.genre == games[i].gameGenre)
            {
                sort.push(games[i]);
            }
        }
    }

    //if platform was selected
    if (message.platform != 'Null') {
        for (i=0; i<games.length; i++) {

            if ((message.platform == games[i].gamePlatform) || ('All' == games[i].gamePlatform) )
            {
                sort.push(games[i]);
            }
        }
    }

    return sort;
}

//generates new avarage score after each review
function newScore(reviews) {

    let total = 0;
    for (i=0; i<reviews.length; i++) {
        total += parseInt(reviews[i].reviewScore);
    }

    let sum = Math.round((total / reviews.length) * 10) / 10;

    return sum.toString();
}

//checks if user has already submited a review
function checkUser(user, reviews) {

    for(i=0; i<reviews.length; i++) {

        if (user == reviews[i].userID)
        {
            return true;
        }
    }
    return false;
}


module.exports.checkUser = checkUser;
module.exports.newScore = newScore;
module.exports.newDate = newDate;
module.exports.adminStatitics = adminStatitics;
module.exports.sortGames = sortGames;