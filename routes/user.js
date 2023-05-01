const express = require("express")
const { signUp, login, getAllUsers, deleteUser } = require("../Controllers/user")

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/", getAllUsers)
router.delete("/:userId", deleteUser)



module.exports= {router}