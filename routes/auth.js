const express = require('express');
const passport = require("passport");
const { generateToken } = require('../utils/generateToken');


const router = express.Router()

//create at /api/user/note-create

router.get("/google",    passport.authenticate('google',  ['profile', 'email']  ))

router.get("/google/callback",
    passport.authenticate('google', {failureRedirect: '/auth/failed' }),
    async (req, res) =>{
      try {
        const token = await generateToken({
          user_id: req.user._id,
          email : req.user.email
       })
const cookieOption = {
  expires : new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000
  ),
  sameSite : "none",
  httpOnly: true,
 
}
if (process.env.NODE_ENV == "production") cookieOption.secure = true

       res.cookie('token', token, cookieOption);;
     res.redirect(process.env.CLIENT_URL)
        
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }
    }
)

router.get("/failed", (req, res)=>{
  res.status(401).send("Log in failure")
})


router.get("/logout", (req, res)=>{
    req.logout()
    res.clearCookie('token');
    res.redirect(process.env.CLIENT_URL)
})
module.exports = { router }