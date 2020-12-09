let bcrypt = require('bcrypt');
let saltrounds = 10;

async function hashPassword(password)
{
    let hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
}

async function comparePassword(password, hashPassword) {

    let isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
}

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;