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


function newDate() {
    let fulldate = new Date();//gets full current date
    let date = fulldate.getFullYear() + "-" + (fulldate.getMonth() + 1) + "-" + fulldate.getDate();
    return date;
}

module.exports.flipCoin = flipCoin;
module.exports.addNumbers = addNumbers;
module.exports.newDate = newDate;