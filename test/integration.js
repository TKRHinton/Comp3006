let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../REVW-app");
let logic = require("../logic");
let db = require("./REVW-db");

chai.use(chaiHttp);

suite("Intergration test for date", function() {

    test("Test GET /home", function() {
        let app = server.app;
        let date = logic.newDate();

        chai.request(app).get("/home").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(date, response.text, "Wrong response test");
        });

    });

    test("Test GET /admin", function() {
        let app = server.app;
        let date = logic.newDate();

        chai.request(app).get("/admin").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(date, response.text, "Wrong response test");
        });

    });

});

suite("Intergration test for /games", function() {

    test("Test GET /games", function() {
        let app = server.app;
        let games = await db.getGames(request.body.gameName);

        chai.request(app).get("/home").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(games[0].gameName, response.text, "games are not present");
        });

    });
});

suite("Intergration test for /admin", function() {

    test("Testing for games", function() {
        let app = server.app;
        let games = await db.getGames(request.body.gameName);

        chai.request(app).get("/home").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(games[0].gameName, response.text, "games are not present");
        });

    });

    test("Testing for users", function() {
        let app = server.app;
        let users = await db.getUsers(request.body.gameName);

        chai.request(app).get("/home").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(users[0].userName, response.text, "users are not present");
        });

    });
});

