function flipCoin() {
    /**
     * Return true for heads, false for tails.
     */
    return Math.random() > 0.5;
}

function addNumbers(number1, number2){
    let sum = number1 + number2;
    return sum;
}

//check if date works
function newDate() {
    let fulldate = new Date();//gets full current date
    let date = fulldate.getFullYear() + "-" + (fulldate.getMonth() + 1) + "-" + fulldate.getDate();
    return date;
}

//num of users == uisers length
function adminStatitics(Users, Games)
{
   // let [userNumber, adminNumber, gameNumber] = Array(3).fill(0);
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
    lengthNum = lengthNum / userNumber;
    lengthNum = Math.round(lengthNum * 100) / 100;

    for (i=0; i<Games.length; i++) {
        gameNumber++;
    }

    var message = {
        userNum : userNumber,
        lenNum : lengthNum,
        adminNum : adminNumber,
        gameNum : gameNumber
    };

    return message;
}

function sortGames(message, games) {

    let sort = [];

    if (message.other != 'Null')
    {
        return games;
    }

    if (message.genre != 'Null') {

        for (i=0; i<games.length; i++) {

            if (message.genre == games[i].gameGenre)
            {
                sort.push(games[i]);
            }
        }
    }

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

//take two values and see if match
function newScore(reviews) {

    let total = 0;
    for (i=0; i<reviews.length; i++) {
        total += parseInt(reviews[i].reviewScore);
    }

    let sum = Math.round((total / reviews.length) * 10) / 10;

    return sum.toString();
}

//send one value to check if true
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
module.exports.flipCoin = flipCoin;
module.exports.addNumbers = addNumbers;
module.exports.newDate = newDate;
module.exports.adminStatitics = adminStatitics;
module.exports.sortGames = sortGames;