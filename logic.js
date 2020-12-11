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

module.exports.flipCoin = flipCoin;
module.exports.addNumbers = addNumbers;