const mongoose  = require("mongoose")
const Schema = mongoose.Schema


const userSchema  = Schema({
    name : {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isGoogleLogin: {
        type: Boolean
    },
    googleId: {
        type:Number
    }
})



const User = mongoose.model("User", userSchema)

 module.exports =  {User}