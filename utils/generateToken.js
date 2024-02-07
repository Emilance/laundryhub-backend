const jwt = require("jsonwebtoken")
require('dotenv').config()

const generateToken = (payloadObj) => {

    return  jwt.sign( payloadObj,
        process.env.TOKEN_KEY,
        {
            expiresIn : "30d"
        }
     )
}

module.exports = {generateToken}