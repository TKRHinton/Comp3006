let bcrypt = require('bcryptjs');
let saltrounds = 10;

//creates hashed password
async function hashPassword(password)
{
    let hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
}

//compares db password with user input
async function comparePassword(password, hashPassword) {

    let isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
}

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;