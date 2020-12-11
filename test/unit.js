let chai = require("chai");
let logic = require("../logic");

suite("Test coin flip", function() {

    test("Test the coin flips properly", function() {
        // Initialise a counter.
        let counter = 0;

        for (let i=0; i<100; i++) {
            // Flip the coin.
            let flip = logic.flipCoin();

            // Test return type.
            chai.assert.isBoolean(flip, "Should be a Boolean");

            if (flip) {
                counter++;
            }
        }

        chai.assert.approximately(50, counter, 10);
    });

});

suite("Test date fucntion", function() {

    test("#Unit test 25 testing the date stamp works properly", function() {
        let date = new Date();
        let dateStr = date.getFullYear() + "-";
        let month = date.getMonth() + 1;
        if (month > 9) {
            dateStr += month + "-";
        } else {
            dateStr += "0" + month + "-";
        }
        if (date.getDate() > 9) {
            dateStr += date.getDate();
        } else {
            dateStr += "0" + date.getDate();
        }

        let webDate = logic.newDate();

        chai.assert.equal(webDate, dateStr, "Date does not match");
    });


});