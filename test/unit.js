let chai = require("chai");
let logic = require("../logic");


suite("Test date fucntion", function() {

    test("testing the date function", function() {
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
suite("Test review function", function() {

    test("testing review score function", function() {

        let test = [{reviewScore: 5}, {reviewScore:9}];

        let sum =  logic.newScore(test);

        chai.assert.equal(sum, "7", "Numbers do not match");
    });

    test("testing review user check", function() {

        let user = "Thomas";
        let reviews = [{userID: "Thomas"}];

        let check = logic.checkUser(user, reviews);



        chai.assert.equal(check, true, "Function can't check user names");
    });

});