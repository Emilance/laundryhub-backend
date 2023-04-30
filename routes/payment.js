const express = require("express")
const { makePayment } = require("../Controllers/payment")
const { verifyToken } = require("../Middleware/auth")

const router = express.Router()


router.post('/',verifyToken, makePayment)


module.exports ={ router }