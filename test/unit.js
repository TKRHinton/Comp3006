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

    test("testing review score function 2", function() {

        let test = [{reviewScore: 8}, {reviewScore:10}, {reviewScore:4}, {reviewScore:2}];

        let sum =  logic.newScore(test);

        chai.assert.equal(sum, "6", "Numbers do not match");
    });


    test("testing review user check (correct user)", function() {

        let user = "Thomas";
        let reviews = [{userID: "Thomas"}];

        let check = logic.checkUser(user, reviews);

        chai.assert.equal(check, true, "Function can't check user names");
    });

    test("testing review user check (wrong user)", function() {

        let user = "Thomas";
        let reviews = [{userID: "James"}];

        let check = logic.checkUser(user, reviews);

        chai.assert.equal(check, false, "Function can't check user names");
    });
});


suite("Test Admin Statisitcs", function() {

    test("testing review score function", function() {

        let users = [{userName: "Harry", admin: false},{userName: "James", admin: true}];
        let games = [{gameName: "Doom"},{gameName: "COD"}];

        let sum =  logic.adminStatitics(users,games);

        chai.assert.equal(sum.userNum, 2, "Numbers do not match");
        chai.assert.equal(sum.lenNum, 5, "Numbers do not match");
        chai.assert.equal(sum.adminNum, 1, "Numbers do not match");
        chai.assert.equal(sum.gameNum, 2, "Numbers do not match");
    });

});


suite("Test Check User", function() {

    test("If User hasn't Reviewed", function() {

        let reviews = [{userID: "Thomas"}, {userID: "James"}];

        let user = "Archie";

        let check = logic.checkUser(user,reviews);

        chai.assert.equal(check, false, "check has not worked");
    });

    test("If User has Reviewed", function() {

        let reviews = [{userID: "Thomas"}, {userID: "Archie"}];

        let user = "Archie";

        let check = logic.checkUser(user,reviews);

        chai.assert.equal(check, true, "check has not worked");
    });


});
