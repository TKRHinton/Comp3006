let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../REVW-app");

chai.use(chaiHttp);

suite("Integration tests for coin flip system", function() {

    test("Test GET /flip", function() {
        let app = server.app;

        chai.request(app).get("/flip").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(["Heads", "Tails"], response.text, "Wrong response text");
        });
    });

});

suite("Testing Sum function", function() {

    test("Test GET /sum", function() {
        let app = server.app;

        chai.request(app).get("/sum").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include("5", response.text, "Wrong response text");
        });

    });

});

suite("Intergration test for date", function() {

    test("Test GET /home", function() {
        let app = server.app;
        let date = logic.newDate();

        chai.request(app).get("/home").end(function(error, response) {
            chai.assert.equal(response.status, 200, "Wrong status code");
            chai.assert.include(date, response.text, "Wrong response test");
        });

    });

});