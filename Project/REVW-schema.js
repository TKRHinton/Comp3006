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

