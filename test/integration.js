let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../REVW-app");
let logic = require("../logic");

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

    test("Test GET /games", function() {
        let app = server.app;
        let date = logic.newDate();

        chai.request(app).get("/games").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(date, response.text, "Wrong response test");
        });

    });

    test("Test GET /profile", function() {
        let app = server.app;
        let date = logic.newDate();

        chai.request(app).get("/profile").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(date, response.text, "Wrong response test");
        });

    });

});


