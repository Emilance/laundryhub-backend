const express = require('express');
const verify = require('../middleware/auth')
const passport = require("passport")


const router = express.Router()

//create at /api/user/note-create

router.get("/google",    passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get("/google/callback",
    passport.authenticate('google', {successRedirect: '/auth/success' , failureRedirect: '/auth/failed' }),
      (req, res)  => {
      // Successful authentication, redirect home.
      console.log(req)
      res.redirect('/');
    }
)

router.get("/failed", (req, res)=>{
  res.send("something went wrong")
})

router.get("/success", (req, res)=>{
  res.send(req)
})

module.exports = { router }