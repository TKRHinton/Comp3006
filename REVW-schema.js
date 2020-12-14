let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
    admin: Boolean
}, {
    versionKey: false
    });
let User = mongoose.model("user", userSchema);
module.exports.User = User;

let gameSchema = new mongoose.Schema({

    gameName: String,
    gamePlatform: String,
    gameGenre: String,
    gameDescription: String,
    gameScore: String,
    gameRelease: String,
    gameImage: String
}, {
    versionKey: false
});

let Game = mongoose.model("game", gameSchema);
module.exports.Game = Game;

let reviewSchema = new mongoose.Schema({

    gameID: String,
    userID: String,
    reviewScore: String,
    reviewDate: String,
    reviewDescription: String
}, {
    versionKey: false
});

let Review = mongoose.model("review", reviewSchema);
module.exports.Review = Review;