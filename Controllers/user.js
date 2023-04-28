const  bcrypt = require("bcrypt")
const { User } = require("../models/user")
const { generateToken } = require("../utils/generateToken")


const signUp = async (req, res) => {
    //get andd validate user input
    
    const { email, password } = req.body
    try {
       if (!( password, email)) {
        return  res.status(400).send("Kindly fill all required input")
       }
 
 
       //check if user already exist
       const existingUser = await User.findOne({ email })
       if (existingUser) {
          console.log(existingUser)
           res.status(409).json("User with this email already exist")
       } else {
 
 
          //Encrypt user password
          const encryptedPassword = await bcrypt.hash(password, 10)
 
          //add user to DB
          const user = await User.create({
             name: (req.body.name || "newUser" ),
             email: email.toLowerCase(),
             password: encryptedPassword,
          })
 
          //create a   token
          const token = generateToken({
            user_id: user._id,
            email
         })
 
          user.token = token
        
 
          res.status(201).json({
             user,
             token,
             message: "User created successfully",
          })
 
       }
 
    } catch (error) {
       res.json({
          status: "FAILED",
          message: error.message
       })
    }
 }


 
const login = async (req, res) => {
    const { email, password } = req.body
    try {
       //validate
       if (!(email && password)) {
          res.status(400).send("Kindly fill all input")
       }
 
       //get user
       const user = await User.findOne({ email })
       if (user) {
          if (await bcrypt.compare(password, user.password)) {
             const token = generateToken( { user_id: user._id, email })
             user.token = token
             res.status(201).json({
                user, token,
                message: "Login Successfull",
             })
          } else {
             res.status(400).send("password Incorrect")
          }
       } else {
          res.status(404).send("No account with this email")
       }
    } catch (error) {
       res.json({
          status: "FAILED",
          message: error.message
       })
    }
 }



 module.exports ={signUp , login}